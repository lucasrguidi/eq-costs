import { Request, Response } from 'express';
import EventsRepository from '../repositories/EventsRepository';
import UserHelper from '../helpers/UserHelper';

class EventController {
  async index(req: Request, res: Response) {
    const userId = await UserHelper.getUserIdByToken(req, res);
    if (!userId) {
      return res.status(404).json({
        error: `Você não tem permissão para executar essa ação`,
      });
    }

    const events = await EventsRepository.findAll(userId);
    res.json(events);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const userId = await UserHelper.getUserIdByToken(req, res);
    if (!userId) {
      return res.status(404).json({
        error: `Você não tem permissão para executar essa ação`,
      });
    }

    const eventMembers = await EventsRepository.getEventMembers(+id);

    if (!eventMembers.some((members) => members.id === userId)) {
      return res.status(404).json({
        error: `Você não tem permissão para executar essa ação`,
      });
    }

    const event = await EventsRepository.findById(+id);

    if (!event) {
      return res.status(404).json({
        error: `Evento não encontrado`,
      });
    }

    res.json(event);
  }

  async store(req: Request, res: Response) {
    const { name, description } = req.body;
    const admin = await UserHelper.getUserIdByToken(req, res);
    if (!admin) return;

    const missingFields = ['name', 'description'].filter((field) => {
      return !req.body[field];
    });

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Campos obrigatórios faltantes: ${missingFields}`,
      });
    }

    const newEvent = await EventsRepository.create(name, description, admin);

    res.json(newEvent);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description } = req.body;
    const userId = await UserHelper.getUserIdByToken(req, res);

    if (!userId)
      return res.status(404).json({
        error: `Você não tem permissão para executar essa ação`,
      });

    const event = await EventsRepository.findById(+id);

    if (!event) {
      return res.status(404).json({
        error: `Evento não encontrado`,
      });
    }

    if (event.admin_id !== userId) {
      return res.status(404).json({
        error: `Somente o criador do evento pode edita-lo`,
      });
    }

    const updatedEvent = await EventsRepository.update(+id, { name, description });

    res.json(updatedEvent);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const userId = await UserHelper.getUserIdByToken(req, res);

    const event = await EventsRepository.findById(+id);
    if (!event) {
      return res.sendStatus(204);
    }

    if (event.admin_id !== userId) {
      return res.status(404).json({
        error: `Somente o criador do evento pode excluí-lo`,
      });
    }

    await EventsRepository.delete(+id);

    res.sendStatus(204);
  }

  async join(req: Request, res: Response) {
    const { id } = req.params;
    const userId = await UserHelper.getUserIdByToken(req, res);

    if (!userId)
      return res.status(404).json({
        error: `Você não tem permissão para executar essa ação`,
      });

    const eventMembers = await EventsRepository.getEventMembers(+id);

    if (eventMembers.some((members) => members.id === userId)) {
      return res.status(404).json({
        error: `Você já está participando desse evento!`,
      });
    }

    await EventsRepository.joinEvent(+id, userId);

    res.status(200).json({
      message: 'Você entrou no evento com sucesso',
    });
  }
}

export default new EventController();
