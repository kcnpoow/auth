import { createSlice } from '@reduxjs/toolkit';
import { loginReducer } from './login.js'
import { authReducer } from './auth.js';

const initialState = {
  info: null,
  isAuthenticated: false,
  isLoading: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    ...loginReducer,
    ...authReducer
  }
});

export default userSlice.reducer;