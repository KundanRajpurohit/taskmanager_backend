"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggle = exports.remove = exports.update = exports.getAll = exports.create = void 0;
const taskService = __importStar(require("./task.service"));
const create = async (req, res) => {
    const { title } = req.body;
    const userId = req.user.userId;
    const task = await taskService.createTask(userId, title);
    res.status(201).json(task);
};
exports.create = create;
const getAll = async (req, res) => {
    const userId = req.user.userId;
    const { page, limit, status, search } = req.query;
    const tasks = await taskService.getTasks({
        userId,
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        status: status !== undefined ? status === "true" : undefined,
        search: search,
    });
    res.json(tasks);
};
exports.getAll = getAll;
const update = async (req, res) => {
    const { title } = req.body;
    const id = req.params.id;
    const userId = req.user.userId;
    await taskService.updateTask(id, userId, title);
    res.json({ message: "Task updated" });
};
exports.update = update;
const remove = async (req, res) => {
    const id = req.params.id;
    const userId = req.user.userId;
    await taskService.deleteTask(id, userId);
    res.json({ message: "Task deleted" });
};
exports.remove = remove;
const toggle = async (req, res) => {
    const id = req.params.id;
    const userId = req.user.userId;
    const task = await taskService.toggleTaskStatus(id, userId);
    res.json(task);
};
exports.toggle = toggle;
