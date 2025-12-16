import express from "express";
import products from "./routes/products";
import stats from "./routes/stats";
import health from "./routes/health";

export const app = express();

app.use(express.json());

app.use("/health", health);
app.use("/products", products);
app.use("/api-stats", stats);
