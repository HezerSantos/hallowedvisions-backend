"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const getR2Object_1 = tslib_1.__importDefault(require("../../../services/getR2Object"));
const getHomeAssets = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = yield (0, getR2Object_1.default)('hallowedvisions', "angelwingsO.glb");
        res.json({ url: url });
    }
    catch (error) {
        next(error);
    }
});
exports.default = getHomeAssets;
