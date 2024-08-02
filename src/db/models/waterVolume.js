import { model, Schema } from 'mongoose';

const waterVolumeItemSchema = new Schema(
  {
    time: { type: String, requared: true },

    volume: { type: Number, requared: true },

    userId: { type: Schema.Types.ObjectId, ref: 'users' },
  },
  { timestamps: true, versionKey: false },
);

export const WaterVolumeItemsCollection = model(
  'waterVolumeItems',
  waterVolumeItemSchema,
);
