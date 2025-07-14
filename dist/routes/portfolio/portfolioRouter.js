"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const getPortfolioAssets_1 = tslib_1.__importDefault(require("../../controllers/portfolio/GET/getPortfolioAssets"));
const portfolioRouter = (0, express_1.Router)();
portfolioRouter.get("/", getPortfolioAssets_1.default);
exports.default = portfolioRouter;
