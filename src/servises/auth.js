import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/session.js';
import { SessionsCollection } from '../db/models/session.js';
import { randomBytes } from 'crypto';

//1. перевіряємо чи є user
//2.хешуємо пароль
//3.повертаємо

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  };
};

export const registerUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });

  if (user) {
    return createHttpError(409, 'Email in use');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  await SessionsCollection.deleteOne({ userId: user._id });

  const newSession = createSession();

  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
    userId: user._id,
    ...newSession,
  });
};

//1. перевіряємо чи є user
//2.якщо є порівнюємо паролі
//3.якщо нерівні,отже не авторизований
//4. видаляємо попередню сессію із заданим userId
//5. створюємо пару accessToken + refreshToken

export const loginUser = async (payload) => {
  //аутентифікації користувача.
  const user = await UsersCollection.findOne({ email: payload.email });

  if (!user) {
    return createHttpError(404, 'Email not found');
  }

  const isEquel = await bcrypt.compare(payload.password, user.password);

  if (!isEquel) {
    throw createHttpError(401, 'Unauthorized');
  }

  await SessionsCollection.deleteOne({ userId: user._id });

  const newSession = createSession();

  return SessionsCollection.create({
    userId: user._id,
    ...newSession,
  });
};

export const loguotUser = async (sessionId) => {
  await SessionsCollection.deleteOne({ _id: sessionId });
};

export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionsCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  const newSession = createSession();

  await SessionsCollection.deleteOne({ _id: sessionId, refreshToken });

  return await SessionsCollection.create({
    userId: session.userId,
    ...newSession,
  });
};
