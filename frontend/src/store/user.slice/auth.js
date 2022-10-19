import { createAsyncThunk } from '@reduxjs/toolkit';
import UserService from '../../services/User.service.js';

export const authAction = createAsyncThunk(
  'user/auth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await UserService.auth();
      return response.data;
    } catch (e) {
      return rejectWithValue('Not authorized');
    }
  }
);

export const authReducer = {
  [authAction.pending]: state => {
    state.isLoading = true;
  },
  [authAction.fulfilled]: (state, { payload }) => {
    state.info = payload.user;
    state.isAuthenticated = true;
    state.isLoading = false;
  },
  [authAction.rejected]: state => {
    state.isLoading = false;
  }
};