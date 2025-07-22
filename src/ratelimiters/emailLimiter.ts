import rateLimit from "express-rate-limit";
import throwError from "../helpers/errorHelper";

const emailLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000,
    max: 5,
    handler: (req, res, next) => {
        next(throwError("Rate Limit Exceeded", 429, [{msg: "Too many attempts. Try later. Please email us directly at contact@hallowedvisions.com"}]))
    }
})

export default emailLimiter