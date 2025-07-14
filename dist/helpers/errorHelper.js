"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpError extends Error {
    constructor(message, status, json) {
        super(message);
        this.status = status;
        this.json = json;
        Object.setPrototypeOf(this, HttpError.prototype);
    }
}
const throwError = (message, status, json) => {
    throw new HttpError(message, status, json);
};
exports.default = throwError;
