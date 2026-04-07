"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.logoutUser = exports.refreshAccessToken = exports.registerUser = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const password_1 = require("../../utils/password");
const jwt_1 = require("../../utils/jwt");
const registerUser = async (email, password) => {
    const existing = await prisma_1.default.user.findUnique({ where: { email } });
    if (existing) {
        throw new Error("User already exists");
    }
    const hashedPassword = await (0, password_1.hashPassword)(password);
    return prisma_1.default.user.create({
        data: {
            email,
            password: hashedPassword,
        },
    });
};
exports.registerUser = registerUser;
const refreshAccessToken = async (refreshToken) => {
    const payload = (0, jwt_1.verifyRefreshToken)(refreshToken);
    const user = await prisma_1.default.user.findUnique({
        where: { id: payload.userId },
    });
    if (!user || user.refreshToken !== refreshToken) {
        throw new Error("Invalid refresh token");
    }
    const newAccessToken = (0, jwt_1.generateAccessToken)(user.id);
    return { accessToken: newAccessToken };
};
exports.refreshAccessToken = refreshAccessToken;
const logoutUser = async (refreshToken) => {
    const payload = (0, jwt_1.verifyRefreshToken)(refreshToken);
    await prisma_1.default.user.update({
        where: { id: payload.userId },
        data: { refreshToken: null },
    });
};
exports.logoutUser = logoutUser;
const loginUser = async (email, password) => {
    const user = await prisma_1.default.user.findUnique({ where: { email } });
    if (!user) {
        throw new Error("Invalid credentials");
    }
    const isValid = await (0, password_1.comparePassword)(password, user.password);
    if (!isValid) {
        throw new Error("Invalid credentials");
    }
    const accessToken = (0, jwt_1.generateAccessToken)(user.id);
    const refreshToken = (0, jwt_1.generateRefreshToken)(user.id);
    await prisma_1.default.user.update({
        where: { id: user.id },
        data: { refreshToken },
    });
    return { accessToken, refreshToken };
};
exports.loginUser = loginUser;
