import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { config } from '../config/auth.config';

export function validateJWT(req: Request, res: Response, next: NextFunction) {
  const accessToken = req.header('Authorization')?.replace('Bearer ', '');
  if (!accessToken) {
    return res.status(401).json({ message: 'Sem autorização' });
  }

  jwt.verify(accessToken, config.secret, (err: VerifyErrors | null) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expirado' });
      }
      return res.status(403).json({ message: 'Token inválido' });
    }

    next();
  });
}
