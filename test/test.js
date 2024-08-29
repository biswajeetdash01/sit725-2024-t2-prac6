import { expect } from 'chai';
import request from 'supertest';  // Import supertest
import express from 'express';
import bodyParser from 'body-parser';

// Setup the Express app and routes
const app = express();
app.use(bodyParser.json());

// Mock saveContact controller function directly in the test
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Simulate email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  // Create and save the new contact
  // For testing purposes, we'll assume success
  res.status(201).json({ message: 'Contact saved successfully' });
});

describe('Save Contact API', function() {
  this.timeout(5000);

  // Test successful contact save
  it('should save a contact successfully', async function() {
    const validContactData = {
      name: "John Doe",
      email: "johndoe@example.com",
      message: "Hello, this is a test message."
    };

    const response = await request(app).post('/contact').send(validContactData);
    expect(response.statusCode).to.equal(201);
    expect(response.body).to.have.property('message', 'Contact saved successfully');
  });

  // Test missing required fields
  it('should return status 400 for missing required fields', async function() {
    const incompleteData = {
      name: "John Doe",
      email: "johndoe@example.com"
      // message is missing
    };

    const response = await request(app).post('/contact').send(incompleteData);
    expect(response.statusCode).to.equal(400);
    expect(response.body).to.have.property('error', 'All fields are required.');
  });

  // Test missing email field
  it('should return status 400 for missing email field', async function() {
    const missingEmailData = {
      name: "John Doe",
      message: "Hello, this is a test message."
    };

    const response = await request(app).post('/contact').send(missingEmailData);
    expect(response.statusCode).to.equal(400);
    expect(response.body).to.have.property('error', 'All fields are required.');
  });

  // Test missing message field
  it('should return status 400 for missing message field', async function() {
    const missingMessageData = {
      name: "John Doe",
      email: "johndoe@example.com"
    };

    const response = await request(app).post('/contact').send(missingMessageData);
    expect(response.statusCode).to.equal(400);
    expect(response.body).to.have.property('error', 'All fields are required.');
  });

  // Test invalid email format
  it('should return status 400 for invalid email format', async function() {
    const invalidEmailData = {
      name: "John Doe",
      email: "invalid-email",
      message: "Hello, this is a test message."
    };

    const response = await request(app).post('/contact').send(invalidEmailData);
    expect(response.statusCode).to.equal(400);
    expect(response.body).to.have.property('error', 'Invalid email format.');
  });

  // Test very long message
  it('should return status 201 for a very long message', async function() {
    const longMessageData = {
      name: "John Doe",
      email: "johndoe@example.com",
      message: "A".repeat(10000)  // Very long message
    };

    const response = await request(app).post('/contact').send(longMessageData);
    expect(response.statusCode).to.equal(201);
    expect(response.body).to.have.property('message', 'Contact saved successfully');
  });

  // Test empty request body
  it('should return status 400 for an empty request body', async function() {
    const response = await request(app).post('/contact').send({});
    expect(response.statusCode).to.equal(400);
    expect(response.body).to.have.property('error', 'All fields are required.');
  });

  // Test extra unnecessary fields
  it('should return status 201 for extra unnecessary fields', async function() {
    const extraFieldsData = {
      name: "John Doe",
      email: "johndoe@example.com",
      message: "Hello, this is a test message.",
      extraField: "Extra value"  // Extra field not required
    };

    const response = await request(app).post('/contact').send(extraFieldsData);
    expect(response.statusCode).to.equal(201);
    expect(response.body).to.have.property('message', 'Contact saved successfully');
  });

  // Test validation with different HTTP methods
  it('should return status 404 for invalid HTTP methods', async function() {
    const response = await request(app).get('/contact');  // Using GET method
    expect(response.statusCode).to.equal(404);
  });
});
