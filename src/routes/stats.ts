
import { Router } from "express";
import { stats } from "../stats/stats";

const router = Router();
router.get("/", (_, res) => res.json(stats.summary()));
export default router;
