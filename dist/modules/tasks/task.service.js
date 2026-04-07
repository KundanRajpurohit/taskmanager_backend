"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleTaskStatus = exports.deleteTask = exports.updateTask = exports.getTasks = exports.createTask = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const createTask = async (userId, title) => {
    return prisma_1.default.task.create({
        data: {
            title,
            userId,
        },
    });
};
exports.createTask = createTask;
const getTasks = async ({ userId, page = 1, limit = 10, status, search, }) => {
    return prisma_1.default.task.findMany({
        where: {
            userId,
            status,
            title: search
                ? { contains: search, mode: "insensitive" }
                : undefined,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
            createdAt: "desc",
        },
    });
};
exports.getTasks = getTasks;
const updateTask = async (taskId, userId, title) => {
    return prisma_1.default.task.updateMany({
        where: { id: taskId, userId },
        data: { title },
    });
};
exports.updateTask = updateTask;
const deleteTask = async (taskId, userId) => {
    return prisma_1.default.task.deleteMany({
        where: { id: taskId, userId },
    });
};
exports.deleteTask = deleteTask;
const toggleTaskStatus = async (taskId, userId) => {
    const task = await prisma_1.default.task.findFirst({
        where: { id: taskId, userId },
    });
    if (!task) {
        throw new Error("Task not found");
    }
    return prisma_1.default.task.update({
        where: { id: taskId },
        data: { status: !task.status },
    });
};
exports.toggleTaskStatus = toggleTaskStatus;
