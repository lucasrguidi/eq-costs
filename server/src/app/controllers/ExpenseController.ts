import { Request, Response } from 'express';
import UserHelper from '../helpers/UserHelper';
import ExpensesRepository from '../repositories/ExpensesRepository';
import EventsRepository from '../repositories/EventsRepository';

class ExpenseController {
  async index(req: Request, res: Response) {
    const userId = await UserHelper.getUserIdByToken(req, res);
    const { eventId } = req.params;

    if (!userId) {
      return res.status(404).json({
        error: `Você não tem permissão para executar essa ação`,
      });
    }

    if (!eventId) {
      return res.status(404).json({
        error: `Você precisa informar um evento.`,
      });
    }

    const event = await EventsRepository.findById(+eventId);

    if (!event) {
      return res.status(404).json({
        error: `Evento não encontrado`,
      });
    }

    const isUserInEvent = await UserHelper.isUserInEvent(userId, +eventId);
    if (!isUserInEvent) {
      return res.status(404).json({
        error: `Você não tem permissão para executar essa ação`,
      });
    }

    const expenses = await ExpensesRepository.findAll(+eventId);

    res.json(expenses);
  }
}

export default new ExpenseController();
