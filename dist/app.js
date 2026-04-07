"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const auth_middleware_1 = require("./middlewares/auth.middleware");
const task_routes_1 = __importDefault(require("./modules/tasks/task.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/auth", auth_routes_1.default);
app.get("/protected", auth_middleware_1.authMiddleware, (req, res) => {
    res.json({
        message: "You are authenticated",
        user: req.user,
    });
});
app.use("/tasks", task_routes_1.default);
exports.default = app;
