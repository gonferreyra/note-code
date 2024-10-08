import mongoose from 'mongoose';

const codeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Code', codeSchema);
