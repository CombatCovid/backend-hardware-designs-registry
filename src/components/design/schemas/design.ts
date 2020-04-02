import { model, Schema } from 'mongoose';

const DesignSchema = new Schema({
  author: {
    type: String,
    required: true
  },
  gitRepo: {
    type: String
  },
  imageUrl: {
    type: String,
    required: true
  },
  stars: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  version: {
    type: Number
  },
  license: {
    type: String
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

export const Design = model('Design', DesignSchema);
