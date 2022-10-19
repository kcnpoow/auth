import { config } from 'dotenv';
config();
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRouter from './routers/user.router.js';
import chatRouter from './routers/chat.router.js';
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter);
app.use(errorMiddleware);

async function start() {
  try {
    mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    app.listen(process.env.PORT);
  } catch (e) {
    console.log(e);
  }
}

start();