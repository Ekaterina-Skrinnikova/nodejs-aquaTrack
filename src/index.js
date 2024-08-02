import { startServer } from './server.js';
import { initMongoDB } from './db/initMongodb.js';

const bootstrap = async () => {
  await initMongoDB();
  startServer();
};

bootstrap();
