
import axios from "axios";
import { stats } from "../stats/stats";

const client = axios.create({
  baseURL: `https://${process.env.SHOPIFY_SHOP}/admin/api/2024-01/graphql.json`,
  headers: {
    "X-Shopify-Access-Token": process.env.SHOPIFY_TOKEN!,
    "Content-Type": "application/json"
  }
});

export async function shopifyQuery(query: string, variables = {}) {
  const start = Date.now();
  try {
    const res = await client.post("", { query, variables });
    stats.recordShopifyCall(Date.now() - start);
    return res.data;
  } catch (err: any) {
    if (err.response?.status === 429) {
      await new Promise(r => setTimeout(r, 500));
      return shopifyQuery(query, variables);
    }
    throw err;
  }
}
