"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopifyQuery = shopifyQuery;
const axios_1 = __importDefault(require("axios"));
const stats_1 = require("../stats/stats");
const client = axios_1.default.create({
    baseURL: `https://${process.env.SHOPIFY_SHOP}/admin/api/2024-01/graphql.json`,
    headers: {
        "X-Shopify-Access-Token": process.env.SHOPIFY_TOKEN,
        "Content-Type": "application/json"
    }
});
async function shopifyQuery(query, variables = {}) {
    const start = Date.now();
    try {
        const res = await client.post("", { query, variables });
        stats_1.stats.recordShopifyCall(Date.now() - start);
        return res.data;
    }
    catch (err) {
        if (err.response?.status === 429) {
            await new Promise(r => setTimeout(r, 500));
            return shopifyQuery(query, variables);
        }
        throw err;
    }
}
