import jwt from 'jsonwebtoken';
import tokenModel from '../models/token.model.js';

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: process.env.ACCESS_SECRET_TIME });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: process.env.REFRESH_SECRET_TIME });
    return { accessToken, refreshToken };
  }

  async saveRefreshToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({ user: userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return await tokenData.save();
    }

    await tokenModel.create({ user: userId, refreshToken });
  }

  async removeRefreshToken(refreshToken) {
    await tokenModel.deleteOne({ refreshToken });
  }

  async findRefreshToken(refreshToken) {
    return await tokenModel.findOne({ refreshToken });
  }

  validateAccessToken(accessToken) {
    try {
      return jwt.verify(accessToken, process.env.ACCESS_SECRET);
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(refreshToken) {
    try {
      return jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    } catch (e) {
      return null;
    }
  }
}

export default new TokenService();