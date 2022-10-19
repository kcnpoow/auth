import ChatService from '../services/chat.service.js';

class ChatController {
  async chats(req, res, next) {
    try {
      const { userId } = req.query;

    } catch {
      next(e);
    }
  }
}

export default new ChatController();