"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const redis_1 = require("../cache/redis");
const client_1 = require("../shopify/client");
const product_1 = require("../transformers/product");
const stats_1 = require("../stats/stats");
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    const start = Date.now();
    const limit = Number(req.query.limit ?? 10);
    const cursor = req.query.cursor;
    const cacheKey = `products:${limit}:${cursor ?? "first"}`;
    const cached = await (0, redis_1.cacheGet)(cacheKey);
    if (cached) {
        stats_1.stats.recordEndpoint(Date.now() - start);
        return res.json(cached);
    }
    const query = `
    query ($first: Int!, $after: String) {
      products(first: $first, after: $after, sortKey: TITLE) {
        edges {
          cursor
          node {
            id title createdAt totalInventory
            variants(first: 1) { edges { node { price } } }
          }
        }
      }
    }
  `;
    const data = await (0, client_1.shopifyQuery)(query, { first: limit, after: cursor });
    const edges = data.data.products.edges;
    const response = {
        products: edges.map((e) => (0, product_1.transformProduct)(e.node)),
        next_page: edges.at(-1)?.cursor
    };
    await (0, redis_1.cacheSet)(cacheKey, response);
    stats_1.stats.recordEndpoint(Date.now() - start);
    res.json(response);
});
router.get("/:id", async (req, res) => {
    const start = Date.now();
    const id = req.params.id;
    const cacheKey = `product:${id}`;
    const cached = await (0, redis_1.cacheGet)(cacheKey);
    if (cached) {
        stats_1.stats.recordEndpoint(Date.now() - start);
        return res.json(cached);
    }
    const query = `
    query ($id: ID!) {
      product(id: $id) {
        id title createdAt totalInventory
        variants(first: 1) { edges { node { price } } }
      }
    }
  `;
    const data = await (0, client_1.shopifyQuery)(query, { id });
    const product = (0, product_1.transformProduct)(data.data.product);
    await (0, redis_1.cacheSet)(cacheKey, product);
    stats_1.stats.recordEndpoint(Date.now() - start);
    res.json(product);
});
exports.default = router;
