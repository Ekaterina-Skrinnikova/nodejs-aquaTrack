import { model, Schema } from 'mongoose';
import { genderList } from '../../constants/user.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: genderList,
      default: 'woman',
    },
    weight: {
      type: Number,
      default: 0,
    },
    activityTime: {
      type: Number,
      default: 0,
    },
    dailyNorma: {
      type: Number,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false },
);

export const UsersCollection = model('users', userSchema);
