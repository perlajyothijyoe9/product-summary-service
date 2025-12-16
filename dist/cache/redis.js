"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
exports.cacheGet = cacheGet;
exports.cacheSet = cacheSet;
const ioredis_1 = __importDefault(require("ioredis"));
exports.redis = new ioredis_1.default(process.env.REDIS_URL);
async function cacheGet(key) {
    const data = await exports.redis.get(key);
    return data ? JSON.parse(data) : null;
}
async function cacheSet(key, value, ttl = 30) {
    await exports.redis.set(key, JSON.stringify(value), "EX", ttl);
}
