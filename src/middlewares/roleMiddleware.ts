import { Request, Response, NextFunction } from 'express';

export const checkRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRoles = req.user?.roles; 

    if (!userRoles) {
      return res.status(403).json({ message: 'Access denied. No roles found.' });
    }

    const hasRole = allowedRoles.some(role => userRoles.includes(role));
    if (!hasRole) {
      return res.status(403).json({ message: 'Access denied. You do not have the required role.' });
    }

    next();
  };
};