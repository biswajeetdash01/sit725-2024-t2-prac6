// models/model.js
import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    movieSuggestion: { type: String, required: true },
    numberOfSeats: { type: Number, required: true }
});

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;
