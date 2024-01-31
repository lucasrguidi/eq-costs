import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/auth.config';
import EventsRepository from '../repositories/EventsRepository';

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

  async isUserInEvent(userId: number, eventId: number): Promise<boolean> {
    const isUserInEvent = (await EventsRepository.getEventMembers(eventId)).some((members) => members.id === userId);

    return isUserInEvent;
  }
}

export default new UserHelper();
