import { RequestHandler } from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { JsonWebTokenError } from "jsonwebtoken";
dotenv.config()


const AUTH_SECRET = String(process.env.AUTH_SECRET)


const verifyAuthToken: RequestHandler = async(req, res, next) => {
    try{
        const authCookie = req.cookies['__Secure-auth.access']
        jwt.verify(authCookie, AUTH_SECRET)
        next()
    } catch(error){
        const jwtError = error as JsonWebTokenError || Error
        if(jwtError.name === 'JsonWebTokenError'){
            res.status(401).end()
        } else {
            next(error)
        }
    }
}

export default verifyAuthToken