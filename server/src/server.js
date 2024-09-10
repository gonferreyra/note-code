import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import logger from './config/logger.js';

import { SERVER } from './config/config.js';
import { corsHandler } from './middleware/corsHandler.js';
import routerCode from './routes/code.routes.js';
import { loggerMiddleware } from './middleware/loggerHandler.js';
import { routeNotFound } from './middleware/routeNotFound.js';

const app = express();
let httpServer;

const Main = () => {
  // URL - reading and parsing body
  app.use(express.urlencoded({ extended: true }));
  // JSON - reading and parsing body
  app.use(express.json());

  // Database Conection
  const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD,
  );
  mongoose.connect(DB).then((connection) => {
    logger.info('Database Connected');
    // logger.info(connection.connections);
  });

  // Middelwares
  app.use(corsHandler);
  app.use(loggerMiddleware);

  // Routes
  app.use('/api/', routerCode);

  app.use(routeNotFound);

  httpServer = http.createServer(app);

  httpServer.listen(3000, () => {
    logger.info('Server Started ' + SERVER.hostname + ':' + SERVER.port);
  });
};

Main();
