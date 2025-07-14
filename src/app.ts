import express from 'express'
import dotenv from 'dotenv'
import cookieParser from './middleware/cookieParserMiddleware'
import helmet from './middleware/helmetMiddleware'
import bodyParser from './middleware/bodyParserMiddleware'
import cors from './middleware/corsMiddleware'
import errorMiddleware from './middleware/errors/errorMiddleware'
import csrfRouter from './routes/csrf/csrfRouter'
import homeRouter from './routes/home/homeRouter'
import validateCsrf from './middleware/csrf/validateCsrf'
import portfolioRouter from './routes/portfolio/portfolioRouter'
dotenv.config()
const app = express()
app.set('trust proxy', 1)
app.use(cookieParser)
app.use(helmet)
app.use(bodyParser)
app.use(cors)

app.use("/api/csrf", csrfRouter)
app.use("/api/home", validateCsrf, homeRouter)
app.use('/api/portfolio', validateCsrf, portfolioRouter)
app.use(errorMiddleware)
const PORT = Number(process.env.PORT) || 8080
app.listen(PORT, '0.0.0.0', () => {
    console.log(`App running on Port ${PORT}`)
})