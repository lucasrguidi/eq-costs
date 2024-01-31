import { Prisma, PrismaClient } from '@prisma/client';

interface Expense {
  id?: number;
  title: string;
  description: string;
  amount: any;
  eventId?: number;
  userId?: number;
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

  async findById(id: number) {
    const expense = await this.prisma.expenses.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        amount: true,
        event_id: true,
        user_id: true,
      },
    });

    return expense;
  }

  async update(id: number, { title, description, amount }: Expense) {
    const data = { title, description, amount };
    const updatedExpense = await this.prisma.expenses.update({
      where: {
        id,
      },
      data,
    });

    return updatedExpense;
  }
}

export default new ExpensesRepository();
