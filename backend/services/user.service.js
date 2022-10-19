import bcrypt from 'bcrypt';
import userModel from '../models/user.model.js';
import tokenService from './token.service.js';
import UserDto from '../dtos/user.dto.js';
import ApiError from '../exceptions/api.error.js';

const SALT = 10;

class UserService {
  async register(name, email, password) {
    const candidate = await userModel.findOne({ email });
    if (candidate) {
      throw ApiError.Conflict('This email is already in use');
    }

    const hashedPassword = await bcrypt.hash(password, SALT);

    const user = await userModel.create({ name, email, password: hashedPassword });
    const userDto = new UserDto(user);

    return userDto;
  }

  async login(email, password) {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw ApiError.NotFound('User with this email was not found');
    }

    const isPasswordEquals = await bcrypt.compare(password, user.password);
    if (!isPasswordEquals) {
      throw ApiError.Unauthorized();
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);

    return { user: userDto, ...tokens };
  }

  async logout(refreshToken) {
    await tokenService.removeRefreshToken(refreshToken);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.Unauthorized();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenDb = await tokenService.findRefreshToken(refreshToken);

    if (!userData || !tokenDb) {
      throw ApiError.Unauthorized();
    }

    const user = await userModel.findById(userData.id);
    const userDto = new UserDto(user);

    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);

    return { user: userDto, ...tokens };
  }

  async getUsersByName(name) {
    if (name === '') {
      return {};
    }
    return await userModel.find(
      { name: { '$regex': name, '$options': 'i' } },
      '-password -rooms -email'
    );
  }
}

export default new UserService();