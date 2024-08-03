import { ONE_DAY } from '../constants/session.js';
import {
  loginUser,
  loguotUser,
  refreshUsersSession,
  registerUser,
} from '../servises/auth.js';

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
    withCredential: true,
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
    withCredential: true,
  });
};

export const registerUserController = async (req, res, next) => {
  const user = await registerUser(req.body);

  setupSession(res, user);

  res.status(200).json({
    status: 200,
    message: 'Successfully registered a user!',
    data: user,
    accessToken: user.accessToken,
  });
};

export const loginUserController = async (req, res, next) => {
  const session = await loginUser(req.body);

  setupSession(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const loguotUserController = async (req, res, next) => {
  if (req.cookie.sessionId) {
    await loguotUser(req.cookie.sessionId);
  }

  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');

  res.status(204).send();
};

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
