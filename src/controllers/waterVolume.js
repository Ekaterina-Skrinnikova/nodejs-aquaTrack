import createHttpError from 'http-errors';
import {
  createWaterVolumeItem,
  deleteWaterVolumeItem,
  getWaterVolumeItemsByDay,
  getWaterVolumeItemsByMonth,
  updateWaterVolumeItem,
} from '../servises/waterVolume.js';

export const createWaterVolumeItemController = async (req, res, next) => {
  const waterVolumeItem = await createWaterVolumeItem({
    ...req.body,
    userId: req._id,
  });

  res.status(201).json({
    status: 201,
    massege: 'Successfully created a waterVolumeItem!',
    data: waterVolumeItem,
  });
};

export const updateWaterVolumeItemController = async (req, res, next) => {
  const { waterVolumeItemId } = req.params;
  const result = await updateWaterVolumeItem(waterVolumeItemId, {
    ...req.body,
    userId: req._id,
  });

  if (!result) {
    next(createHttpError(404, 'WaterVolumeItem not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully updated a waterVolumeItem!',
    data: result.waterVolumeItem,
  });
};

export const deleteWaterVolumeItemController = async (req, res, next) => {
  const { waterVolumeItemId } = req.params;

  const waterVolumeItem = await deleteWaterVolumeItem(waterVolumeItemId, {
    userId: req._id,
  });

  if (!waterVolumeItem) {
    next(createHttpError(404, 'WaterVolumeItem not found'));
  }

  res.status(204).send();
};

export const getWaterVolumeItemsByDayController = async (req, res, next) => {
  const result = await getWaterVolumeItemsByDay(req.body.date, {
    userId: req._id,
  });

  const totalVolumeOfDay = result.reduce((sum, item) => sum + item.volume, 0);

  res.status(200).json({
    status: 200,
    massege: `Total volume of day ${totalVolumeOfDay}`,
    data: { totalVolumeOfDay, userId: req._id },
  });
};

export const getWaterVolumeItemsByMonthController = async (req, res, next) => {
  const result = await getWaterVolumeItemsByMonth(req.body.date, {
    userId: req._id,
  });

  const totalVolumeOfMonth = result.reduce((sum, item) => sum + item.volume, 0);

  res.status(200).json({
    status: 200,
    massege: `Total volume of month ${totalVolumeOfMonth}`,
    data: { totalVolumeOfMonth, userId: req._id },
  });
};
