import { model, Schema } from 'mongoose';
import { genderList } from '../../constants/user.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: 'Visitor',
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
      default: 1.5,
    },
    avatar: {
      type: String,
      default: '',
    },
  },
  { timestamps: true, versionKey: false },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = model('users', userSchema);
