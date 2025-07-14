"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const bodyParser = [
    express_1.default.urlencoded({ extended: true }),
    express_1.default.json()
];
exports.default = bodyParser;
