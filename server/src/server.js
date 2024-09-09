import express from 'express';
import http from 'http';
import logger from './config/logger.js';

import { SERVER } from './config/config.js';
import { corsHandler } from './middleware/corsHandler.js';
import routerUsers from './routes/user.routes.js';
import { loggerMiddleware } from './middleware/loggerHandler.js';

const app = express();
let httpServer;

const Main = () => {
  // URL - reading and parsing body
  app.use(express.urlencoded({ extended: true }));
  // JSON - reading and parsing body
  app.use(express.json());

  // Database Conection

  // Middelwares
  app.use(corsHandler);
  app.use(loggerMiddleware);

  // Routes
  app.use('/api/', routerUsers);

  httpServer = http.createServer(app);

  httpServer.listen(3000, () => {
    logger.info('Server Started ' + SERVER.hostname + ':' + SERVER.port);
  });
};

Main();
