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
var EventsRepository_1 = __importDefault(require("../repositories/EventsRepository"));
var UserHelper_1 = __importDefault(require("../helpers/UserHelper"));
var EventController = /** @class */ (function () {
    function EventController() {
    }
    EventController.prototype.index = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, events;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserHelper_1.default.getUserIdByToken(req, res)];
                    case 1:
                        userId = _a.sent();
                        if (!userId) {
                            return [2 /*return*/, res.status(404).json({
                                    error: "Voc\u00EA n\u00E3o tem permiss\u00E3o para executar essa a\u00E7\u00E3o",
                                })];
                        }
                        return [4 /*yield*/, EventsRepository_1.default.findAll(userId)];
                    case 2:
                        events = _a.sent();
                        res.json(events);
                        return [2 /*return*/];
                }
            });
        });
    };
    EventController.prototype.show = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, userId, eventMembers, event;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, UserHelper_1.default.getUserIdByToken(req, res)];
                    case 1:
                        userId = _a.sent();
                        if (!userId) {
                            return [2 /*return*/, res.status(404).json({
                                    error: "Voc\u00EA n\u00E3o tem permiss\u00E3o para executar essa a\u00E7\u00E3o",
                                })];
                        }
                        return [4 /*yield*/, EventsRepository_1.default.getEventMembers(+id)];
                    case 2:
                        eventMembers = _a.sent();
                        if (!eventMembers.some(function (members) { return members.id === userId; })) {
                            return [2 /*return*/, res.status(404).json({
                                    error: "Voc\u00EA n\u00E3o tem permiss\u00E3o para executar essa a\u00E7\u00E3o",
                                })];
                        }
                        return [4 /*yield*/, EventsRepository_1.default.findById(+id)];
                    case 3:
                        event = _a.sent();
                        if (!event) {
                            return [2 /*return*/, res.status(404).json({
                                    error: "Evento n\u00E3o encontrado",
                                })];
                        }
                        res.json(event);
                        return [2 /*return*/];
                }
            });
        });
    };
    EventController.prototype.store = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, description, admin, missingFields, newEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, name = _a.name, description = _a.description;
                        return [4 /*yield*/, UserHelper_1.default.getUserIdByToken(req, res)];
                    case 1:
                        admin = _b.sent();
                        if (!admin)
                            return [2 /*return*/];
                        missingFields = ['name', 'description'].filter(function (field) {
                            return !req.body[field];
                        });
                        if (missingFields.length > 0) {
                            return [2 /*return*/, res.status(400).json({
                                    error: "Campos obrigat\u00F3rios faltantes: ".concat(missingFields),
                                })];
                        }
                        return [4 /*yield*/, EventsRepository_1.default.create(name, description, admin)];
                    case 2:
                        newEvent = _b.sent();
                        res.json(newEvent);
                        return [2 /*return*/];
                }
            });
        });
    };
    EventController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, name, description, userId, event, updatedEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        _a = req.body, name = _a.name, description = _a.description;
                        return [4 /*yield*/, UserHelper_1.default.getUserIdByToken(req, res)];
                    case 1:
                        userId = _b.sent();
                        if (!userId)
                            return [2 /*return*/, res.status(404).json({
                                    error: "Voc\u00EA n\u00E3o tem permiss\u00E3o para executar essa a\u00E7\u00E3o",
                                })];
                        return [4 /*yield*/, EventsRepository_1.default.findById(+id)];
                    case 2:
                        event = _b.sent();
                        if (!event) {
                            return [2 /*return*/, res.status(404).json({
                                    error: "Evento n\u00E3o encontrado",
                                })];
                        }
                        if (event.admin_id !== userId) {
                            return [2 /*return*/, res.status(404).json({
                                    error: "Somente o criador do evento pode edita-lo",
                                })];
                        }
                        return [4 /*yield*/, EventsRepository_1.default.update(+id, { name: name, description: description })];
                    case 3:
                        updatedEvent = _b.sent();
                        res.json(updatedEvent);
                        return [2 /*return*/];
                }
            });
        });
    };
    EventController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, userId, event;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, UserHelper_1.default.getUserIdByToken(req, res)];
                    case 1:
                        userId = _a.sent();
                        return [4 /*yield*/, EventsRepository_1.default.findById(+id)];
                    case 2:
                        event = _a.sent();
                        if (!event) {
                            return [2 /*return*/, res.sendStatus(204)];
                        }
                        if (event.admin_id !== userId) {
                            return [2 /*return*/, res.status(404).json({
                                    error: "Somente o criador do evento pode exclu\u00ED-lo",
                                })];
                        }
                        return [4 /*yield*/, EventsRepository_1.default.delete(+id)];
                    case 3:
                        _a.sent();
                        res.sendStatus(204);
                        return [2 /*return*/];
                }
            });
        });
    };
    EventController.prototype.join = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, userId, eventMembers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, UserHelper_1.default.getUserIdByToken(req, res)];
                    case 1:
                        userId = _a.sent();
                        if (!userId)
                            return [2 /*return*/, res.status(404).json({
                                    error: "Voc\u00EA n\u00E3o tem permiss\u00E3o para executar essa a\u00E7\u00E3o",
                                })];
                        return [4 /*yield*/, EventsRepository_1.default.getEventMembers(+id)];
                    case 2:
                        eventMembers = _a.sent();
                        if (eventMembers.some(function (members) { return members.id === userId; })) {
                            return [2 /*return*/, res.status(404).json({
                                    error: "Voc\u00EA j\u00E1 est\u00E1 participando desse evento!",
                                })];
                        }
                        return [4 /*yield*/, EventsRepository_1.default.joinEvent(+id, userId)];
                    case 3:
                        _a.sent();
                        res.status(200).json({
                            message: 'Você entrou no evento com sucesso',
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    return EventController;
}());
exports.default = new EventController();
