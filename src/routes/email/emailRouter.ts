import { Router } from 'express'
import postEmail from '../../controllers/email/POST/postEmail'

const emailRouter = Router()


emailRouter.post("/", postEmail)

export default emailRouter