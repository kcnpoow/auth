import { Router } from 'express';
import chatController from '../controllers/chat.controller.js';

const router = new Router();

router.get('/chats', chatController.chats);

export default router;