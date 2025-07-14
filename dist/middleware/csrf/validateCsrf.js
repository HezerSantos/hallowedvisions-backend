"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errorHelper_1 = tslib_1.__importDefault(require("../../helpers/errorHelper"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const CSRF_SECRET = String(process.env.CSRF_SECRET);
const verifyCsrf = (cookieCsrfToken, headerCsrfToken) => {
    const decoded = jsonwebtoken_1.default.verify(cookieCsrfToken, CSRF_SECRET);
    const csrfToken = decoded.csrfToken;
    if (headerCsrfToken !== csrfToken) {
        return false;
    }
    return true;
};
const validateCsrf = (req, res, next) => {
    try {
        const headerCsrfToken = String(req.headers['csrftoken']);
        const cookieCsrfToken = req.cookies['__Secure-auth.csrf'];
        if (!headerCsrfToken) {
            (0, errorHelper_1.default)("403 Forbidden", 403, [{ msg: "Unauthorized" }]);
        }
        const match = verifyCsrf(cookieCsrfToken, headerCsrfToken);
        if (!match) {
            (0, errorHelper_1.default)("403 Forbidden", 403, [{ msg: "Unauthorized" }]);
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = validateCsrf;
