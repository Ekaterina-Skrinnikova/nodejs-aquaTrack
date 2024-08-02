import Joi from 'joi';

export const createWaterVolumeItemSchema = Joi.object({
  time: Joi.string().required(),
  volume: Joi.number().required(),
});

export const updateWaterVolumeItemSchema = Joi.object({
  time: Joi.string(),
  volume: Joi.number(),
});
