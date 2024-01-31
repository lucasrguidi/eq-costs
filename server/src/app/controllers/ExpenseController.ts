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

  async store(req: Request, res: Response) {
    const { title, description, amount } = req.body;
    const { eventId } = req.params;
    const userId = await UserHelper.getUserIdByToken(req, res);

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

    const missingFields = ['title', 'amount'].filter((field) => {
      return !req.body[field];
    });

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Campos obrigatórios faltantes: ${missingFields}`,
      });
    }

    await ExpensesRepository.create(title, description, amount, +eventId, userId);

    res.status(200).json({
      message: 'Despesada cadastrada com sucesso!',
    });
  }
}

export default new ExpenseController();
