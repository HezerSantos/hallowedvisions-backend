import { Router } from 'express'
import getPortfolioAssets from '../../controllers/portfolio/GET/getPortfolioAssets'
import getProjectAssets from '../../controllers/portfolio/GET/getProjectAssets'

const portfolioRouter = Router()

portfolioRouter.get("/", getPortfolioAssets)
portfolioRouter.get("/:id", getProjectAssets)

export default portfolioRouter