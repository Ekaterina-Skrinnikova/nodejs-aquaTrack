import { Router } from 'express';
import waterVolumeItemsRouter from '../routers/waterVolume.js';
import authUser from '../routers/auth.js';

const router = Router();

router.use('/water', waterVolumeItemsRouter);
router.use('/auth', authUser);

export default router;
