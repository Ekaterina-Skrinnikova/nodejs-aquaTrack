import { WaterVolumeItemsCollection } from '../db/models/waterVolume.js';

export const createWaterVolumeItem = async (payload) => {
  const waterVolumeItem = await WaterVolumeItemsCollection.create(payload);
  return waterVolumeItem;
};

export const updateWaterVolumeItem = async (
  waterVolumeItemId,
  payload,
  options = {},
) => {
  const rawResult = await WaterVolumeItemsCollection.findOneAndUpdate(
    { _id: waterVolumeItemId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    waterVolumeItem: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteWaterVolumeItem = async (waterVolumeItemId, userId) => {
  const waterVolumeItem = await WaterVolumeItemsCollection.findOneAndDelete({
    _id: waterVolumeItemId,
  });
  return waterVolumeItem;
};

export const getWaterVolumeItemsByDay = async (inputDate, userId) => {
  const [day, month, year] = inputDate.split('-').map(Number);

  const startOfDay = new Date(year, month - 1, day, 0, 0, 0, 0);
  const endOfDay = new Date(year, month - 1, day, 23, 59, 59, 999);

  return await WaterVolumeItemsCollection.find({
    createdAt: { $gte: startOfDay, $lt: endOfDay },
    userId,
  });
};

export const getWaterVolumeItemsByMonth = async (inputDate, userId) => {
  const [month, year] = inputDate.split('-').map(Number);

  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);

  return await WaterVolumeItemsCollection.find({
    createdAt: { $gte: startOfMonth, $lt: endOfMonth },
    userId,
  });
};
