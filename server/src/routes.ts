import { Router } from 'express';

import AuthController from './app/controllers/AuthController';
import UserController from './app/controllers/UserController';

import EventController from './app/controllers/EventController';
import { validateJWT } from './app/middleware/authJwt';
import ExpenseController from './app/controllers/ExpenseController';

const router = Router();

// Auth
router.post('/auth/login', AuthController.login); // Rota de login
router.post('/auth/signup', AuthController.signup); // Rota de cadastro
router.get('/auth/profile', AuthController.profile); // Rota de validação do JWT e load do usuário da sessão

// Users
router.use('/users', validateJWT); // Verifica a validade do Token JWT

router.get('/users/:id', UserController.show); // Carregar dados do perfil
router.put('/users/:id', UserController.update); // Atualizar dados do perfil
router.delete('/users/:id', UserController.delete); // Deleter perfil

// Events
router.use('/events', validateJWT); // Verifica a validade do Token JWT

router.get('/events', EventController.index); // Visualizar todos os eventos daquele usuário
router.get('/events/:id', EventController.show); // Visualizar detalhes daquele evento
router.post('/events', EventController.store); // Criar novo evento
router.put('/events/:id', EventController.update); // Atualizar dados do evento
router.delete('/events/:id', EventController.delete); // Excluir evento
router.post('/events/:id/join', EventController.join); // Entrar em um evento

// Expenses
router.use('/expenses', validateJWT); // Verifica a validade do Token JWT

router.get('/expenses/:eventId', ExpenseController.index); // Visualizar todos as despesas daquele evento
router.post('/expenses/:eventId', ExpenseController.store); // Cadastrar nova despesa em um evento
router.put('/expenses/:id', ExpenseController.update); // Atualizar dados de uma despesa
router.delete('/expenses/:id', ExpenseController.delete); // Deletar uma despesa

export default router;
