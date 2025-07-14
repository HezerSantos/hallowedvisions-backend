"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const getCsrf_1 = tslib_1.__importDefault(require("../../controllers/csrf/getCsrf"));
const csrfRouter = (0, express_1.Router)();
csrfRouter.get("/", getCsrf_1.default);
exports.default = csrfRouter;
