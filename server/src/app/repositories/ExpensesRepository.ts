import { Prisma, PrismaClient } from '@prisma/client';

interface Expense {
  id?: number;
  title: string;
  amount: any;
  eventId?: number;
}

class ExpensesRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(eventId: number): Promise<Expense[]> {
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
}

export default new ExpensesRepository();
