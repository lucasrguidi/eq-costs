import { Prisma, PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';

interface User {
  username: string;
  email: string;
  password: string;
}

class UsersRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findByEmail(email: string) {
    const user = await this.prisma.users.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findByUsername(username: string) {
    const user = await this.prisma.users.findUnique({
      where: {
        username,
      },
    });

    return user;
  }

  async findById(id: number) {
    const user = await this.prisma.users.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async create(username: string, email: string, password: string) {
    const hashedPassword = await bcryptjs.hash(password, 10);
    const user: Prisma.UsersCreateInput = { username, email, password: hashedPassword };

    const newUser = await this.prisma.users.create({ data: user });

    return newUser;
  }

  async update(id: number, { username, email, password }: User) {
    const data = { username, email, password };
    const updatedUser = await this.prisma.users.update({
      where: {
        id,
      },
      data,
    });

    return updatedUser;
  }

  async delete(id: number) {
    const deleteUser = await this.prisma.users.update({
      where: {
        id,
      },
      data: {
        active: false,
      },
    });
    return deleteUser;
  }
}

export default new UsersRepository();
