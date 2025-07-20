import { Router } from "express";
import getAuthToken from "../../controllers/auth/GET/getAuthToken";

const authRouter = Router()


authRouter.get("/", getAuthToken)

export default authRouter