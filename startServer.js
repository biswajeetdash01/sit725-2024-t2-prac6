// server.js
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import connectToDatabase from './database.js';
import router from './routers/router.js';

// Resolve the directory name from the current module URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3040;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to the database
connectToDatabase();

// Attach the router
router(app);

// Serve static files from the "public" directory
app.use(express.static(join(__dirname, 'public')));

// Serve the HTML file when accessing the root
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
