"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var UsersRepository_1 = __importDefault(require("../repositories/UsersRepository"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var auth_config_1 = require("../config/auth.config");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, user, correctPassword, accessToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, email = _a.email, password = _a.password;
                        return [4 /*yield*/, UsersRepository_1.default.findByEmail(email)];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(401).json({
                                    error: "Email ou senha inv\u00E1lidos",
                                })];
                        }
                        return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
                    case 2:
                        correctPassword = _b.sent();
                        if (!correctPassword) {
                            return [2 /*return*/, res.status(401).json({
                                    error: "Email ou senha inv\u00E1lidos",
                                })];
                        }
                        accessToken = jsonwebtoken_1.default.sign({ key: user.id }, auth_config_1.config.secret, { expiresIn: '1h' });
                        res.json({ access_token: accessToken, message: 'Logado com sucesso!' });
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.signup = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, username, email, password, missingFields, emailAlreadyUsed, usernameAlreadyUsed;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, username = _a.username, email = _a.email, password = _a.password;
                        missingFields = ['username', 'email', 'password'].filter(function (field) {
                            return !req.body[field];
                        });
                        if (missingFields.length > 0) {
                            return [2 /*return*/, res.status(400).json({
                                    error: "Campos obrigat\u00F3rios faltantes: ".concat(missingFields),
                                })];
                        }
                        return [4 /*yield*/, UsersRepository_1.default.findByEmail(email)];
                    case 1:
                        emailAlreadyUsed = _b.sent();
                        return [4 /*yield*/, UsersRepository_1.default.findByUsername(username)];
                    case 2:
                        usernameAlreadyUsed = _b.sent();
                        if (emailAlreadyUsed && usernameAlreadyUsed) {
                            return [2 /*return*/, res.status(400).json({
                                    error: "Email e usu\u00E1rio j\u00E1 cadastrados",
                                })];
                        }
                        if (emailAlreadyUsed) {
                            return [2 /*return*/, res.status(400).json({
                                    error: "Email j\u00E1 cadastrado",
                                })];
                        }
                        if (usernameAlreadyUsed) {
                            return [2 /*return*/, res.status(400).json({
                                    error: "Nome de usu\u00E1rio j\u00E1 cadastrado",
                                })];
                        }
                        return [4 /*yield*/, UsersRepository_1.default.create(username, email, password)];
                    case 3:
                        _b.sent();
                        res.status(200).json({
                            message: 'Usuário criado com sucesso!',
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.profile = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var accessToken;
            var _this = this;
            return __generator(this, function (_b) {
                accessToken = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
                if (!accessToken) {
                    return [2 /*return*/, res.status(401).json({ error: 'Sem autorização' })];
                }
                jsonwebtoken_1.default.verify(accessToken, auth_config_1.config.secret, function (err, decoded) { return __awaiter(_this, void 0, void 0, function () {
                    var userId, user, username, email;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (err) {
                                    return [2 /*return*/, res.status(401).json({ error: 'Token expirado ou inválido' })];
                                }
                                if (!(decoded && typeof decoded === 'object' && 'key' in decoded)) return [3 /*break*/, 2];
                                userId = decoded.key;
                                return [4 /*yield*/, UsersRepository_1.default.findById(userId)];
                            case 1:
                                user = _a.sent();
                                if (!user)
                                    return [2 /*return*/, res.status(401).json({ error: 'Token expirado ou inválido' })];
                                username = user.username, email = user.email;
                                return [2 /*return*/, res.status(200).json({ username: username, email: email })];
                            case 2: return [2 /*return*/, res.status(401).json({ error: 'Token expirado ou inválido' })];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    return AuthController;
}());
exports.default = new AuthController();
