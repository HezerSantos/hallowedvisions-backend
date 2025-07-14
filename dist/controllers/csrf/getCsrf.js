"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const crypto = tslib_1.__importStar(require("crypto"));
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
const getCsrfController = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const csrfValue = crypto.randomBytes(32).toString('hex');
        const csrfToken = jsonwebtoken_1.default.sign({ csrfToken: csrfValue }, String(process.env.CSRF_SECRET), { expiresIn: '15m' });
        res.cookie('__Secure-auth.csrf', csrfToken, {
            httpOnly: false,
            secure: true,
            maxAge: 5 * 1000 * 60,
            sameSite: "none",
            path: "/",
            domain: process.env.NODE_ENV === "production" ? ".hallowedvisions.com" : ""
        });
        res.status(200).end();
    }
    catch (error) {
        next(error);
    }
});
exports.default = getCsrfController;
