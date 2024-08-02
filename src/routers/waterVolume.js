import { Router } from 'express';
import {
  createWaterVolumeItemController,
  deleteWaterVolumeItemController,
  getWaterVolumeItemsByDayController,
  updateWaterVolumeItemController,
} from '../controllers/waterVolume.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';

const waterVolumeItemsRouter = Router();

waterVolumeItemsRouter.get(
  '/day',
  ctrlWrapper(getWaterVolumeItemsByDayController),
);

waterVolumeItemsRouter.get(
  '/month',
  ctrlWrapper(getWaterVolumeItemsByDayController),
);

waterVolumeItemsRouter.post('/', ctrlWrapper(createWaterVolumeItemController));

waterVolumeItemsRouter.patch(
  '/:waterVolumeItemId',
  isValidId,
  ctrlWrapper(updateWaterVolumeItemController),
);

waterVolumeItemsRouter.delete(
  '/:waterVolumeItemId',
  isValidId,
  ctrlWrapper(deleteWaterVolumeItemController),
);
export default waterVolumeItemsRouter;
