import logger from '../config/logger.js';

export function routeNotFound(req, res) {
  const error = new Error('Route Not Found');

  logger.error(error);

  return res.status(404).json({ error: error.message });
}
