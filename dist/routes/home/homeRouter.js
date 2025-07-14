"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const getHomeAssets_1 = tslib_1.__importDefault(require("../../controllers/home/GET/getHomeAssets"));
const homeRouter = (0, express_1.Router)();
homeRouter.get("/", getHomeAssets_1.default);
exports.default = homeRouter;
