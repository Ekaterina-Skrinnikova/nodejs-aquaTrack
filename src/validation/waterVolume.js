import Joi, { required } from 'joi';

export const createWaterVolumeItemSchema = Joi.object({
  time: Joi.string,required()
});
