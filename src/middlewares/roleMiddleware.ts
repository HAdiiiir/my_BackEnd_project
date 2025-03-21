import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const checkRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; roles: string[] };
      const hasRole = allowedRoles.some(role => decoded.roles.includes(role));
      if (!hasRole) {
        return res.status(403).json({ message: 'Access denied. You do not have the required role.' });
      }

      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token.' });
    }
  };
};