import { Request, Response } from 'express';
import UsersRepository from '../repositories/UsersRepository';
import UserHelper from '../helpers/UserHelper';

class UserController {
  async show(req: Request, res: Response) {
    const { id } = req.params;
    const userId = await UserHelper.getUserIdByToken(req, res);

    if (+id !== userId) {
      return res.status(404).json({
        error: `Você não tem permissão para executar essa ação`,
      });
    }

    const user = await UsersRepository.findById(+id);

    if (!user) {
      return res.status(404).json({
        error: `Usuário não encontrado`,
      });
    }

    res.json(user);
  }

  async store(req: Request, res: Response) {
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

    const newUser = await UsersRepository.create(username, email, password);

    res.json(newUser);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { username, email, password } = req.body;
    const userId = await UserHelper.getUserIdByToken(req, res);

    if (+id !== userId) {
      return res.status(404).json({
        error: `Você não tem permissão para executar essa ação`,
      });
    }

    const user = await UsersRepository.findById(+id);

    if (!user) {
      return res.status(404).json({
        error: `Usuário não encontrado`,
      });
    }

    const userByUsername = await UsersRepository.findByUsername(username);

    const userByEmail = await UsersRepository.findByEmail(email);

    if (userByUsername && userByEmail && userByUsername.id !== +id && userByEmail.id !== +id) {
      return res.status(400).json({
        error: `Usuário e email já estão sendo utilizados por outra conta`,
      });
    }

    if (userByUsername && userByUsername?.id !== +id) {
      return res.status(400).json({
        error: `Usuário já está sendo utilizado por outra conta`,
      });
    }

    if (userByEmail && userByEmail?.id !== +id) {
      return res.status(400).json({
        error: `Email já está sendo utilizado por outra conta`,
      });
    }

    const updatedUser = await UsersRepository.update(+id, { username, email, password });

    res.json(updatedUser);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const userId = await UserHelper.getUserIdByToken(req, res);

    const user = await UsersRepository.findById(+id);
    if (!user) {
      return res.sendStatus(204);
    }

    console.log(user, userId);

    if (user.id !== userId) {
      return res.status(404).json({
        error: `Você não tem permissão para executar essa ação`,
      });
    }

    await UsersRepository.delete(+id);

    res.sendStatus(204);
  }
}

export default new UserController();
