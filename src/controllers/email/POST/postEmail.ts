import { RequestHandler } from "express";
import resend from "../../../services/resend/resend";

interface EmailDetails {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  company: string;
  websiteType: string;
  message: string;
}

const postEmail: RequestHandler = async(req, res, next) => {
    try{
        const {firstName, lastName, phoneNumber, email, company, websiteType, message} = req.body as EmailDetails

        // const res = await resend.emails.send({
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


        setTimeout(() => {
            console.log("Client Email Sent")
            res.status(200).end()
        }, 5000)
    } catch (error) {
        next(error)
    }
}

export default postEmail