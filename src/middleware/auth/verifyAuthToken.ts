import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { JsonWebTokenError } from "jsonwebtoken";
import throwError from "../../helpers/errorHelper";
dotenv.config();

const AUTH_SECRET = String(process.env.AUTH_SECRET);

const verifyAuthToken: RequestHandler = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization?.split(" ")?.[1] ?? "";
    if (!authToken) {
      throwError("Unauthorized", 401, [{ msg: "Unauthorized" }]);
      return;
    }
    jwt.verify(authToken, AUTH_SECRET);
    next();
  } catch (error) {
    const jwtError = (error as JsonWebTokenError) || Error;
    if (
      jwtError.name === "JsonWebTokenError" ||
      jwtError.name === "TokenExpiredError"
    ) {
      throwError("401", 401, [{ msg: "Unauthorized" }]);
    } else {
      next(error);
    }
  }
};

export default verifyAuthToken;
