import { RequestHandler } from "express";

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

        console.log(firstName)
    } catch (error) {
        next(error)
    }
}

export default postEmail