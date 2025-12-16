
import { Router } from "express";
import { cacheGet, cacheSet } from "../cache/redis";
import { shopifyQuery } from "../shopify/client";
import { transformProduct } from "../transformers/product";
import { stats } from "../stats/stats";

const router = Router();

router.get("/", async (req, res) => {
  const start = Date.now();
  const limit = Number(req.query.limit ?? 10);
  const cursor = req.query.cursor as string | undefined;

  const cacheKey = `products:${limit}:${cursor ?? "first"}`;
  const cached = await cacheGet<any>(cacheKey);

  if (cached) {
    stats.recordEndpoint(Date.now() - start);
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

  const data = await shopifyQuery(query, { first: limit, after: cursor });
  const edges = data.data.products.edges;

  const response = {
    products: edges.map((e: any) => transformProduct(e.node)),
    next_page: edges.at(-1)?.cursor
  };

  await cacheSet(cacheKey, response);
  stats.recordEndpoint(Date.now() - start);
  res.json(response);
});

router.get("/:id", async (req, res) => {
  const start = Date.now();
  const id = req.params.id;
  const cacheKey = `product:${id}`;

  const cached = await cacheGet(cacheKey);
  if (cached) {
    stats.recordEndpoint(Date.now() - start);
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

  const data = await shopifyQuery(query, { id });
  const product = transformProduct(data.data.product);

  await cacheSet(cacheKey, product);
  stats.recordEndpoint(Date.now() - start);
  res.json(product);
});

export default router;
