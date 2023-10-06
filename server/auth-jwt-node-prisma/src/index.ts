import express from 'express';
import routes from './routes';
import cors from 'cors';
import 'express-async-errors';
import { PrismaClient } from '@prisma/client';
import errorHandler from './app/exceptions/errorHandler';

const app = express();
export const prisma = new PrismaClient();
prisma.$connect();

app.use(express.json());
app.use(
  cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);
app.use(routes);
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000 🔥🔥🔥');
});
