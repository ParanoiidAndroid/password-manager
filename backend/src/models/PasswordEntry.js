import mongoose from 'mongoose';

const PasswordEntrySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
}, { timestamps: true });

export default mongoose.model('PasswordEntry', PasswordEntrySchema);
