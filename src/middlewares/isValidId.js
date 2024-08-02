import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { waterVolumeItemId } = req.params;

  if (!isValidObjectId(waterVolumeItemId)) {
    next(createHttpError(404, `Id = ${waterVolumeItemId} not found`));
  }

  next();
};
