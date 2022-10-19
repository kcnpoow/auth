import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user.slice/index.js';

export default configureStore({
  reducer: {
    user: userReducer
  },
  devTools: true
});