"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWT = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var auth_config_1 = require("../config/auth.config");
function validateJWT(req, res, next) {
    var _a;
    var accessToken = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!accessToken) {
        return res.status(401).json({ message: 'Sem autorização' });
    }
    jsonwebtoken_1.default.verify(accessToken, auth_config_1.config.secret, function (err) {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expirado' });
            }
            return res.status(403).json({ message: 'Token inválido' });
        }
        next();
    });
}
exports.validateJWT = validateJWT;
