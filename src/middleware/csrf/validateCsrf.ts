import { RequestHandler } from "express";
import throwError from "../../helpers/errorHelper";
import dotenv from  'dotenv'
import jwt from "jsonwebtoken";
dotenv.config()
const CSRF_SECRET = String(process.env.CSRF_SECRET)
interface VerifyCsrfType {
    (cookieCsrfToken: string, headerCsrfToken: string): Boolean
}

interface DecodedType {
    csrfToken: string
}

const verifyCsrf: VerifyCsrfType = (cookieCsrfToken, headerCsrfToken) => {
    const decoded = jwt.verify(cookieCsrfToken, CSRF_SECRET)

    const csrfToken = (decoded as DecodedType).csrfToken

    if(headerCsrfToken !== csrfToken){
        return false
    }

    return true
}
const validateCsrf: RequestHandler = (req, res, next) => {
    try{
        const headerCsrfToken = String(req.headers['__Secure-auth.csrf'])
        const cookieCsrfToken = req.cookies['__Secure-auth.csrf']

        if(!headerCsrfToken){
            throwError("403 Forbidden", 403, [{msg: "Unauthorized"}])
        }

        const match = verifyCsrf(cookieCsrfToken, headerCsrfToken)

        if(!match){
            throwError("403 Forbidden", 403, [{msg: "Unauthorized"}])
        }

        next()
    } catch(error){
        next(error)
    }
}

export default validateCsrf