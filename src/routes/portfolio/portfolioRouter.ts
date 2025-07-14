import { Router } from 'express'
import getPortfolioAssets from '../../controllers/portfolio/GET/getPortfolioAssets'

const portfolioRouter = Router()

portfolioRouter.get("/", getPortfolioAssets)

export default portfolioRouter