import { model, Schema } from 'mongoose';
import { updateTime } from '../../utils/updateTime.js';

const waterVolumeItemSchema = new Schema(
  {
    time: { type: String, requared: true, default: updateTime },

    volume: { type: Number, requared: true },

    userId: { type: Schema.Types.ObjectId, ref: 'users' },
  },
  { timestamps: true, versionKey: false },
);

export const WaterVolumeItemsCollection = model(
  'waterVolumeItems',
  waterVolumeItemSchema,
);
