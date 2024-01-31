import { Prisma, PrismaClient } from '@prisma/client';

interface Expense {
  id?: number;
  title: string;
  description: string;
  amount: any;
  eventId?: number;
  userId: number;
}

class ExpensesRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(eventId: number) {
    const expenses = await this.prisma.expenses.findMany({
      where: {
        event_id: eventId,
      },
    });

    return expenses.map((expense) => {
      return {
        id: expense.id,
        title: expense.title,
        description: expense.description,
        amount: expense.amount,
      };
    });
  }

  async create(title: string, description: string, amount: any, eventId: number, userId: number) {
    const expense: Prisma.ExpensesCreateInput = {
      title,
      description,
      amount,
      event: {
        connect: {
          id: eventId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    };

    const newExpense = await this.prisma.expenses.create({ data: expense });

    return newExpense;
  }
}

export default new ExpensesRepository();
