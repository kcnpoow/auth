import authApi from '../api/auth.api.js';

export default class ChatService {
  static async getChats(userId) {
    const url = `/chat/chats?userId=${userId}`;
    return await authApi.get(url);
  }
}