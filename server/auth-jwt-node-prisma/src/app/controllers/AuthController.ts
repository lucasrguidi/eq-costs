import { Request, Response } from 'express';
import UsersRepository from '../repositories/UsersRepository';
import jwt from 'jsonwebtoken';
import { config } from '../config/auth.config';
import bcryptjs from 'bcryptjs';

class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await UsersRepository.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        error: `Email ou senha inválidos`,
      });
    }

    const correctPassword = await bcryptjs.compare(password, user.password);
    if (!correctPassword) {
      return res.status(401).json({
        error: `Email ou senha inválidos`,
      });
    }

    const accessToken = jwt.sign({ key: user.id }, config.secret, { expiresIn: '1h' });

    res.json({ access_token: accessToken, message: 'Logado com sucesso!' });
  }

  async signup(req: Request, res: Response) {
    const { username, email, password } = req.body;

    const missingFields = ['username', 'email', 'password'].filter((field) => {
      return !req.body[field];
    });

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Campos obrigatórios faltantes: ${missingFields}`,
      });
    }

    const emailAlreadyUsed = await UsersRepository.findByEmail(email);
    const usernameAlreadyUsed = await UsersRepository.findByUsername(username);

    if (emailAlreadyUsed && usernameAlreadyUsed) {
      return res.status(400).json({
        error: `Email e usuário já cadastrados`,
      });
    }

    if (emailAlreadyUsed) {
      return res.status(400).json({
        error: `Email já cadastrado`,
      });
    }

    if (usernameAlreadyUsed) {
      return res.status(400).json({
        error: `Nome de usuário já cadastrado`,
      });
    }

    await UsersRepository.create(username, email, password);

    res.status(200).json({
      message: 'Usuário criado com sucesso!',
    });
  }

  async profile(req: Request, res: Response) {
    const accessToken = req.header('Authorization')?.replace('Bearer ', '');

    if (!accessToken) {
      return res.status(401).json({ error: 'Sem autorização' });
    }

    jwt.verify(accessToken, config.secret, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Token expirado ou inválido' });
      }

      if (decoded && typeof decoded === 'object' && 'key' in decoded) {
        const userId = decoded.key;
        const user = await UsersRepository.findById(userId);
        if (!user) return res.status(401).json({ error: 'Token expirado ou inválido' });
        const { username, email } = user;
        return res.status(200).json({ username, email });
      }

      return res.status(401).json({ error: 'Token expirado ou inválido' });
    });
  }
}

export default new AuthController();
