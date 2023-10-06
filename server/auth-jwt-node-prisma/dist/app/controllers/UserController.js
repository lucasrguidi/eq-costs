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
var UserHelper_1 = __importDefault(require("../helpers/UserHelper"));
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.show = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, userId, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, UserHelper_1.default.getUserIdByToken(req, res)];
                    case 1:
                        userId = _a.sent();
                        if (+id !== userId) {
                            return [2 /*return*/, res.status(404).json({
                                    error: "Voc\u00EA n\u00E3o tem permiss\u00E3o para executar essa a\u00E7\u00E3o",
                                })];
                        }
                        return [4 /*yield*/, UsersRepository_1.default.findById(+id)];
                    case 2:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(404).json({
                                    error: "Usu\u00E1rio n\u00E3o encontrado",
                                })];
                        }
                        res.json(user);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.store = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, username, email, password, missingFields, emailAlreadyUsed, usernameAlreadyUsed, newUser;
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
                        newUser = _b.sent();
                        res.json(newUser);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, username, email, password, userId, user, userByUsername, userByEmail, updatedUser;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        _a = req.body, username = _a.username, email = _a.email, password = _a.password;
                        return [4 /*yield*/, UserHelper_1.default.getUserIdByToken(req, res)];
                    case 1:
                        userId = _b.sent();
                        if (+id !== userId) {
                            return [2 /*return*/, res.status(404).json({
                                    error: "Voc\u00EA n\u00E3o tem permiss\u00E3o para executar essa a\u00E7\u00E3o",
                                })];
                        }
                        return [4 /*yield*/, UsersRepository_1.default.findById(+id)];
                    case 2:
                        user = _b.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(404).json({
                                    error: "Usu\u00E1rio n\u00E3o encontrado",
                                })];
                        }
                        return [4 /*yield*/, UsersRepository_1.default.findByUsername(username)];
                    case 3:
                        userByUsername = _b.sent();
                        return [4 /*yield*/, UsersRepository_1.default.findByEmail(email)];
                    case 4:
                        userByEmail = _b.sent();
                        if (userByUsername && userByEmail && userByUsername.id !== +id && userByEmail.id !== +id) {
                            return [2 /*return*/, res.status(400).json({
                                    error: "Usu\u00E1rio e email j\u00E1 est\u00E3o sendo utilizados por outra conta",
                                })];
                        }
                        if (userByUsername && (userByUsername === null || userByUsername === void 0 ? void 0 : userByUsername.id) !== +id) {
                            return [2 /*return*/, res.status(400).json({
                                    error: "Usu\u00E1rio j\u00E1 est\u00E1 sendo utilizado por outra conta",
                                })];
                        }
                        if (userByEmail && (userByEmail === null || userByEmail === void 0 ? void 0 : userByEmail.id) !== +id) {
                            return [2 /*return*/, res.status(400).json({
                                    error: "Email j\u00E1 est\u00E1 sendo utilizado por outra conta",
                                })];
                        }
                        return [4 /*yield*/, UsersRepository_1.default.update(+id, { username: username, email: email, password: password })];
                    case 5:
                        updatedUser = _b.sent();
                        res.json(updatedUser);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, userId, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, UserHelper_1.default.getUserIdByToken(req, res)];
                    case 1:
                        userId = _a.sent();
                        return [4 /*yield*/, UsersRepository_1.default.findById(+id)];
                    case 2:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, res.sendStatus(204)];
                        }
                        console.log(user, userId);
                        if (user.id !== userId) {
                            return [2 /*return*/, res.status(404).json({
                                    error: "Voc\u00EA n\u00E3o tem permiss\u00E3o para executar essa a\u00E7\u00E3o",
                                })];
                        }
                        return [4 /*yield*/, UsersRepository_1.default.delete(+id)];
                    case 3:
                        _a.sent();
                        res.sendStatus(204);
                        return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports.default = new UserController();
