import rateLimit from "express-rate-limit";
import throwError from "../helpers/errorHelper";

const portfolioLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 30,
    handler: (req, res, next) => {
        next(throwError("Rate Limit Exceeded", 429, [{msg: "Too many Requests"}]))
    }
})

export default portfolioLimiter