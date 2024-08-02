import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserController } from '../controllers/user.js';

const authUser = Router();

authUser.post('/register', ctrlWrapper(registerUserController));

export default authUser;
