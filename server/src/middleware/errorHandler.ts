import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  logger.error({
    error: err,
    request: req.url,
    method: req.method,
    ip: req.ip,
  });

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message: process.env.NODE_ENV === 'production' && !err.isOperational
      ? 'Something went wrong!'
      : message,
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
    }),
  });
};