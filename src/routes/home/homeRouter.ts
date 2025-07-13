import { Router } from 'express'
import getHomeAssets from '../../controllers/home/GET/getHomeAssets'

const homeRouter = Router()


homeRouter.get("/", getHomeAssets)

export default homeRouter