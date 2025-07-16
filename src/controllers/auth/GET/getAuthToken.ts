import { RequestHandler } from "express";
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()

const AUTH_SECRET = String(process.env.AUTH_SECRET)
const getAuthToken: RequestHandler = async(req, res, next) => {
    try{
        const origin = req.headers.origin || ''
        if(origin !== (process.env.NODE_ENV === "production"? process.env.CLIENT_URL : "http://localhost:5173")){
            res.status(403).end()
            return
        }
        const authToken = jwt.sign({target: "guser"}, AUTH_SECRET, {expiresIn: '15m'})

        res.cookie('__Secure-auth.access', authToken, {
            httpOnly: false, 
            secure: true, 
            maxAge: 15 * 1000 * 60, 
            sameSite: "none",
            path: "/",
            domain: process.env.NODE_ENV === "production"? ".hallowedvisions.com" : ""
        })

        res.status(200).end()
    } catch(error) {
        next(error)
    }
}

export default getAuthToken