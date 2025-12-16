"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const products_1 = __importDefault(require("./routes/products"));
const stats_1 = __importDefault(require("./routes/stats"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use("/products", products_1.default);
exports.app.use("/api-stats", stats_1.default);
