import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../services/User.service.js';

export const registerAction = createAsyncThunk(
  'user/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await AuthService.register(name, email, password);
      return response.data;
    } catch (e) {
      return rejectWithValue({ status: e.response.status, message: e.response.data.message });
    }
  }
);