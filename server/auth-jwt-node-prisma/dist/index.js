"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes"));
var cors_1 = __importDefault(require("cors"));
require("express-async-errors");
var client_1 = require("@prisma/client");
var errorHandler_1 = __importDefault(require("./app/exceptions/errorHandler"));
var app = (0, express_1.default)();
exports.prisma = new client_1.PrismaClient();
exports.prisma.$connect();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(routes_1.default);
app.use(errorHandler_1.default);
app.listen(3000, function () {
    console.log('Server running at http://localhost:3000 🔥🔥🔥');
});
