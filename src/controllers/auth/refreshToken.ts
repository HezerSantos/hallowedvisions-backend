import { RequestHandler } from "express";
import { AUTH_REFRESH_ID } from "../../common/constants/auth";
import { JsonWebTokenError } from "jsonwebtoken";
import throwError from "../../helpers/errorHelper";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getTokenTimes, PublicResponse } from "./helpers/helpers";
dotenv.config();

const AUTH_SECRET = String(process.env.AUTH_SECRET);
const REFRESH_SECRET = String(process.env.REFRESH_SECRET);

const refreshToken: RequestHandler = (req, res, next) => {
  try {
    const refreshToken = req.cookies[AUTH_REFRESH_ID];
    if (!refreshToken) {
      throwError("Unauthorized", 401, [{ msg: "Unauthorized" }]);
      return;
    }
    jwt.verify(refreshToken, REFRESH_SECRET);

    const { issuedAt, expiresAt } = getTokenTimes(15, "m");
    const authToken = jwt.sign(
      { target: "guset", type: "secure" },
      AUTH_SECRET,
      { expiresIn: expiresAt },
    );

    const publicResponse: PublicResponse = {
      expiresAt,
      issuedAt,
      token: authToken,
    };

    res.status(200).json(publicResponse);
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

export default refreshToken;
