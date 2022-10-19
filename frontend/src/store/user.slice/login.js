import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../services/User.service.js';

export const loginAction = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await AuthService.login(email, password);
      return response.data;
    } catch (e) {
      return rejectWithValue({ status: e.response.status, message: e.response.data.message });
    }
  }
);

export const loginReducer = {
  [loginAction.fulfilled]: (state, { payload }) => {
    state.info = payload.user;
    state.isAuthenticated = true;
    localStorage.setItem('token', payload.accessToken);
  }
};