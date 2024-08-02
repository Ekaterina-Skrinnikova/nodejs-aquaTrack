import { Router } from 'express';
import {
  createWaterVolumeItemController,
  deleteWaterVolumeItemController,
  getWaterVolumeItemsByDayController,
  updateWaterVolumeItemController,
} from '../controllers/waterVolume.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createWaterVolumeItemSchema,
  updateWaterVolumeItemSchema,
} from '../validation/waterVolume.js';
import { authenticate } from '../middlewares/authenticate.js';

const waterVolumeItemsRouter = Router();

waterVolumeItemsRouter.use(authenticate);

waterVolumeItemsRouter.post(
  '/',
  validateBody(createWaterVolumeItemSchema),
  ctrlWrapper(createWaterVolumeItemController),
);

waterVolumeItemsRouter.patch(
  '/:waterVolumeItemId',
  isValidId,
  validateBody(updateWaterVolumeItemSchema),
  ctrlWrapper(updateWaterVolumeItemController),
);

waterVolumeItemsRouter.delete(
  '/:waterVolumeItemId',
  isValidId,
  ctrlWrapper(deleteWaterVolumeItemController),
);

waterVolumeItemsRouter.get(
  '/day',
  ctrlWrapper(getWaterVolumeItemsByDayController),
);

waterVolumeItemsRouter.get(
  '/month',
  ctrlWrapper(getWaterVolumeItemsByDayController),
);

export default waterVolumeItemsRouter;
