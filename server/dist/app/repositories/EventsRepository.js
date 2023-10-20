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
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var EventsRepository = /** @class */ (function () {
    function EventsRepository() {
        this.prisma = new client_1.PrismaClient();
    }
    EventsRepository.prototype.findAll = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var events;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.user_Events.findMany({
                            where: {
                                user_id: userId,
                            },
                            select: {
                                event: {
                                    select: {
                                        id: true,
                                        name: true,
                                        description: true,
                                        admin_id: true,
                                        admin: {
                                            select: {
                                                username: true,
                                            },
                                        },
                                    },
                                },
                            },
                        })];
                    case 1:
                        events = _a.sent();
                        return [2 /*return*/, events.map(function (userEvent) {
                                return {
                                    id: userEvent.event.id,
                                    name: userEvent.event.name,
                                    description: userEvent.event.description,
                                    admin: userEvent.event.admin.username,
                                };
                            })];
                }
            });
        });
    };
    EventsRepository.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var event;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.events.findUnique({
                            where: {
                                id: id,
                            },
                            select: {
                                id: true,
                                name: true,
                                description: true,
                                admin_id: true,
                                admin: {
                                    select: {
                                        username: true,
                                    },
                                },
                            },
                        })];
                    case 1:
                        event = _a.sent();
                        return [2 /*return*/, event];
                }
            });
        });
    };
    EventsRepository.prototype.create = function (name, description, adminId) {
        return __awaiter(this, void 0, void 0, function () {
            var event, newEvent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event = {
                            name: name,
                            description: description,
                            admin: {
                                connect: {
                                    id: adminId,
                                },
                            },
                        };
                        return [4 /*yield*/, this.prisma.events.create({ data: event })];
                    case 1:
                        newEvent = _a.sent();
                        return [4 /*yield*/, this.prisma.user_Events.create({
                                data: {
                                    user_id: adminId,
                                    event_id: newEvent.id,
                                },
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, newEvent];
                }
            });
        });
    };
    EventsRepository.prototype.update = function (id, _a) {
        var name = _a.name, description = _a.description;
        return __awaiter(this, void 0, void 0, function () {
            var data, updatedEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        data = { name: name, description: description };
                        return [4 /*yield*/, this.prisma.events.update({
                                where: {
                                    id: id,
                                },
                                data: data,
                            })];
                    case 1:
                        updatedEvent = _b.sent();
                        return [2 /*return*/, updatedEvent];
                }
            });
        });
    };
    EventsRepository.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var deleteEvent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.events.delete({
                            where: {
                                id: id,
                            },
                        })];
                    case 1:
                        deleteEvent = _a.sent();
                        return [2 /*return*/, deleteEvent];
                }
            });
        });
    };
    EventsRepository.prototype.getEventMembers = function (eventId) {
        return __awaiter(this, void 0, void 0, function () {
            var eventMembers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.user_Events.findMany({
                            where: {
                                event_id: eventId,
                            },
                            select: {
                                user: {
                                    select: {
                                        id: true,
                                        username: true,
                                    },
                                },
                            },
                        })];
                    case 1:
                        eventMembers = _a.sent();
                        return [2 /*return*/, eventMembers.map(function (member) {
                                return {
                                    id: member.user.id,
                                    username: member.user.username,
                                };
                            })];
                }
            });
        });
    };
    EventsRepository.prototype.joinEvent = function (eventId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var joinEvent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.user_Events.create({
                            data: {
                                event_id: eventId,
                                user_id: userId,
                            },
                        })];
                    case 1:
                        joinEvent = _a.sent();
                        return [2 /*return*/, joinEvent];
                }
            });
        });
    };
    return EventsRepository;
}());
exports.default = new EventsRepository();
