import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const isDev = process.env.NODE_ENV === 'dev';

  res.status(statusCode).json({
    message: err.message,
    stack: isDev ? err.stack : null,
  });
};