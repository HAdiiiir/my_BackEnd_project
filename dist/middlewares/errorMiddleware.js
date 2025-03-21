"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    const isDev = process.env.NODE_ENV === 'dev';
    res.status(statusCode).json({
        message: err.message,
        stack: isDev ? err.stack : null,
    });
};
exports.errorHandler = errorHandler;
