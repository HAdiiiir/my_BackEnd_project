"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const routing_controllers_1 = require("routing-controllers");
const AuthController_1 = require("./controllers/AuthController");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const notFoundMiddleware_1 = require("./middlewares/notFoundMiddleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Connect to MongoDB
mongoose_1.default.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
// Set up routing-controllers
(0, routing_controllers_1.useExpressServer)(app, {
    controllers: [AuthController_1.AuthController],
});
// معالجة الطلبات غير المعروفة
app.use(notFoundMiddleware_1.notFoundHandler);
// استخدام middleware لمعالجة الأخطاء
app.use(errorMiddleware_1.errorHandler);
exports.default = app;
