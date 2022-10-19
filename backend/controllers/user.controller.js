import userService from '../services/user.service.js';

class UserController {
  async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      await userService.register(name, email, password);
      return res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: process.env.REFRESH_SECRET_TIME, httpOnly: true }).json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      await userService.logout(refreshToken);
      res.clearCookie('refreshToken').sendStatus(200);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res
        .cookie('refreshToken', userData.refreshToken, { maxAge: process.env.REFRESH_SECRET_TIME, httpOnly: true })
        .json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getUsersByName(req, res, next) {
    try {
      const { name } = req.body;
      const users = await userService.getUsersByName(name);
      res.json(users);
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();