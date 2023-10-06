import { Prisma, PrismaClient } from '@prisma/client';

interface Event {
  id?: number;
  name: string;
  description: string;
  admin?: number;
}

class EventsRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(userId: number) {
    const events = await this.prisma.user_Events.findMany({
      where: {
        user_id: userId,
      },
      select: {
        event: {
          select: {
            id: true,
            name: true,
            description: true,
            admin_id: true,
            admin: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });

    return events.map((userEvent) => {
      return {
        id: userEvent.event.id,
        name: userEvent.event.name,
        description: userEvent.event.description,
        admin: userEvent.event.admin.username,
      };
    });
  }

  async findById(id: number) {
    const event = await this.prisma.events.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        admin_id: true,
        admin: {
          select: {
            username: true,
          },
        },
      },
    });

    return event;
  }

  async create(name: string, description: string, adminId: number) {
    const event: Prisma.EventsCreateInput = {
      name,
      description,
      admin: {
        connect: {
          id: adminId,
        },
      },
    };

    const newEvent = await this.prisma.events.create({ data: event });
    await this.prisma.user_Events.create({
      data: {
        user_id: adminId,
        event_id: newEvent.id,
      },
    });

    return newEvent;
  }

  async update(id: number, { name, description }: Event) {
    const data = { name, description };
    const updatedEvent = await this.prisma.events.update({
      where: {
        id,
      },
      data,
    });

    return updatedEvent;
  }

  async delete(id: number) {
    const deleteEvent = await this.prisma.events.delete({
      where: {
        id,
      },
    });
    return deleteEvent;
  }

  async getEventMembers(eventId: number) {
    const eventMembers = await this.prisma.user_Events.findMany({
      where: {
        event_id: eventId,
      },
      select: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    return eventMembers.map((member) => {
      return {
        id: member.user.id,
        username: member.user.username,
      };
    });
  }

  async joinEvent(eventId: number, userId: number) {
    const joinEvent = await this.prisma.user_Events.create({
      data: {
        event_id: eventId,
        user_id: userId,
      },
    });

    return joinEvent;
  }
}

export default new EventsRepository();
