import dotenv from 'dotenv'; //для зчитування змінних оточення

dotenv.config();

export function env(name, defaultValue) {
  const value = process.env[name]; //Для доступу до змінних оточення в середовищі Node.js використовується глобальний об'єкт process.env

  if (value) return value;

  if (defaultValue) return defaultValue;

  throw new Error(`Missing: process.env['${name}'].`);
}
