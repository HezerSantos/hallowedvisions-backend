import { Request, Response, NextFunction } from "express";
import resend from "../../../services/resend/resend";
import validateEmailBody from "../../../validation/email/emailValidator";
import { validationResult } from "express-validator";
import throwError from "../../../helpers/errorHelper";
import prisma from "../../../config/prisma";
import emailLimiter from "../../../ratelimiters/emailLimiter";
interface EmailDetails {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  company: string;
  websiteType: string;
  message: string;
}

const incrementEmailCount = async() => {
    await prisma.emailCounter.update({
        where: {
            id: 1
        },
        data: {
            count: {
                increment: 1
            }
        }
    })
}
const postEmail= [
    ...validateEmailBody,
    emailLimiter,
    async(req: Request, res: Response, next: NextFunction) => {
        try{

            const errors = validationResult(req)
            if(!errors.isEmpty()){
                throwError("Validation Error", 400, errors.array())
            }
            const {firstName, lastName, phoneNumber, email, company, websiteType, message} = req.body as EmailDetails

            const emailCount = await prisma.emailCounter.findFirst()
            if(emailCount){
                if(emailCount.count >= 2800){
                    throwError("Email Count Exceeded", 429, [{msg: "We're not accepting messages through the website at the moment. Please email us directly at contact@hallowedvisions.com"}])
                }  
            }
            const {error} = await resend.emails.send({
                from: `${company? company : "Client"} <client@hallowedvisions.com>`,
                to: "hezernsantos@gmail.com",
                subject: "Client Contact",
                html: `
                    <p>
                        FROM: ${firstName} ${lastName}
                    </p>
                    <p>
                        Type: ${websiteType? websiteType : "N/A"}
                    </p>
                    <br/>
                    <p>
                        ${message}
                    </p>
                    <br/>
                    <p>
                        ${phoneNumber}
                    </p>
                    <p>
                        ${email}
                    </p>
                `
            })

            
            if(error) {
                throwError(error.message, 500, [{msg: "Error Sending Email"}])
            }
            await incrementEmailCount()
            res.status(200).json([{msg: "Thanks We Got the Message"}])
        } catch (error) {
            next(error)
        }
    }
]

export default postEmail
