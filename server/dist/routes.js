"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AuthController_1 = __importDefault(require("./app/controllers/AuthController"));
var UserController_1 = __importDefault(require("./app/controllers/UserController"));
var EventController_1 = __importDefault(require("./app/controllers/EventController"));
var authJwt_1 = require("./app/middleware/authJwt");
var router = (0, express_1.Router)();
// Auth
router.post('/auth/login', AuthController_1.default.login); // Rota de login
router.post('/auth/signup', AuthController_1.default.signup); // Rota de cadastro
router.get('/auth/profile', AuthController_1.default.profile); // Rota de validação do JWT e load do usuário da sessão
// Users
router.use('/users', authJwt_1.validateJWT); // Verifica a validade do Token JWT
router.get('/users/:id', UserController_1.default.show); // Carregar dados do perfil
router.put('/users/:id', UserController_1.default.update); // Atualizar dados do perfil
router.delete('/users/:id', UserController_1.default.delete); // Deleter perfil
// Events
router.use('/events', authJwt_1.validateJWT); // Verifica a validade do Token JWT
router.get('/events', EventController_1.default.index); // Visualizar todos os eventos daquele usuário
router.get('/events/:id', EventController_1.default.show); // Visualizar detalhes daquele evento
router.post('/events', EventController_1.default.store); // Criar novo evento
router.put('/events/:id', EventController_1.default.update); // Atualizar dados do evento
router.delete('/events/:id', EventController_1.default.delete); // Excluir evento
router.post('/events/:id/join', EventController_1.default.join); // Entrar em um evento
exports.default = router;
