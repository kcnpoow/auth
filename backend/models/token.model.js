import mongoose from 'mongoose';

const TokenSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  refreshToken: { type: String }
});

export default mongoose.model('Token', TokenSchema);