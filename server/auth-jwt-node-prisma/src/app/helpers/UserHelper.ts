import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/auth.config';

class UserHelper {
  async getUserIdByToken(req: Request, res: Response): Promise<number | undefined> {
    const accessToken = req.header('Authorization')?.replace('Bearer ', '');
    if (!accessToken) return undefined;

    return new Promise((resolve, reject) => {
      jwt.verify(accessToken, config.secret, (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: 'Token expirado ou inválido' });
        }

        if (decoded && typeof decoded === 'object' && 'key' in decoded) {
          const userId = decoded.key;
          resolve(userId);
        } else {
          reject(res.status(401).json({ error: 'Token expirado ou inválido' }));
        }
      });
    });
  }
}

export default new UserHelper();
