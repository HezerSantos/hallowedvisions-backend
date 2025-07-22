import { Request, Response, NextFunction } from "express";
import resend from "../../../services/resend/resend";
import validateEmailBody from "../../../validation/email/emailValidator";
import { validationResult } from "express-validator";
import throwError from "../../../helpers/errorHelper";
interface EmailDetails {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  company: string;
  websiteType: string;
  message: string;
}

const postEmail= [
    ...validateEmailBody,
    async(req: Request, res: Response, next: NextFunction) => {
        try{

            const errors = validationResult(req)
            if(!errors.isEmpty()){
                throwError("Validation Error", 400, errors.array())
            }
            const {firstName, lastName, phoneNumber, email, company, websiteType, message} = req.body as EmailDetails

            // const {data, error} = await resend.emails.send({
            //     from: `${company? company : "Client"} <client@hallowedvisions.com>`,
            //     to: "hezernsantos@gmail.com",
            //     subject: "Client Contact",
            //     html: `
            //         <p>
            //             FROM: ${firstName} ${lastName}
            //         </p>
            //         <p>
            //             Type: ${websiteType? websiteType : "N/A"}
            //         </p>
            //         <br/>
            //         <p>
            //             ${message}
            //         </p>
            //         <br/>
            //         <p>
            //             ${phoneNumber}
            //         </p>
            //         <p>
            //             ${email}
            //         </p>
            //     `
            // })

            // if(error) {
            //     throwError(error.message, 500, [{msg: "Error Sending Email"}])
            // }

            setTimeout(() => {
                console.log("Client Email Sent")
                res.status(200).end()
            }, 1)
        } catch (error) {
            next(error)
        }
    }
]

export default postEmail