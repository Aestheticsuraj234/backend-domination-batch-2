import express from 'express';

import { AddTask, FetchTask } from '../controllers/task.controller.js';
import { isLoggedIn } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/add-task', isLoggedIn, AddTask);
router.get('/fetch-task', isLoggedIn, FetchTask);

export default router;
