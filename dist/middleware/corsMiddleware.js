"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cors_1 = tslib_1.__importDefault(require("cors"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
const allowedOrigins = [
    String(process.env.CLIENT_URL),
    "http://localhost:5173",
    "http://localhost:3000"
];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) {
            return callback(null, true);
        }
        if (allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        }
        else {
            console.warn('Blocked CORS for:', origin);
            return callback(new Error("CORS not allowed for this origin"), false);
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cookie",
        "Set-Cookie",
        'csrfToken'
    ],
    credentials: true,
    optionsSuccessStatus: 200
};
exports.default = (0, cors_1.default)(corsOptions);
