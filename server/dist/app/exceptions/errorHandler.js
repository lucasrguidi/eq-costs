"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorHandler = function (err, req, res, next) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno do servidor' });
};
exports.default = errorHandler;
