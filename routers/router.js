import express from 'express';
import { saveContact } from '../controllers/controller.js';

const router = express.Router();

router.post('/contact', saveContact);

export default (app) => {
    app.use(router);  // Attach the router to the app
};
