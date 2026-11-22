import { Router } from "express";
import getPortfolioAssets from "../../controllers/portfolio/GET/getPortfolioAssets";
import getProjectAssets from "../../controllers/portfolio/GET/getProjectAssets";
import createWorkExperienceController from "../../controllers/portfolio/createWorkExperienceController";

const portfolioRouter = Router();

portfolioRouter.get("/", getPortfolioAssets);
portfolioRouter.get("/:id", getProjectAssets);

portfolioRouter.post("/workExperience", createWorkExperienceController);

export default portfolioRouter;
