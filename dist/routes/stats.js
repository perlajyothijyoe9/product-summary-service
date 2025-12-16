"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stats_1 = require("../stats/stats");
const router = (0, express_1.Router)();
router.get("/", (_, res) => res.json(stats_1.stats.summary()));
exports.default = router;
