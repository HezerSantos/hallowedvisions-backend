import { Router } from "express";
import getAuthToken from "../../controllers/auth/getAuthToken";
import refreshToken from "../../controllers/auth/refreshToken";

const authRouter = Router();

authRouter.post("/public", getAuthToken);
authRouter.post("/public/refresh", refreshToken);

export default authRouter;
