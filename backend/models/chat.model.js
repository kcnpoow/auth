import mongoose from 'mongoose';

const ChatSchema = mongoose.Schema({
  messages: { type: Array }
});