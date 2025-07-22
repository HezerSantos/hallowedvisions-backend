import { body } from 'express-validator'


const validateEmailBody = [
    body("firstName")
        .trim()
        .notEmpty().withMessage("First Name Can't Be Empty")
        .escape(),
    body("lastName")
        .trim()
        .notEmpty().withMessage("Last Name Can't Be Empty")
        .escape(),
    body("phoneNumber")
        .trim()
        .notEmpty()
        .isMobilePhone('en-US').withMessage("Invalid Phone Number")
        .escape(),
    body("email")
        .trim()
        .notEmpty()
        .isEmail().withMessage("Invalid Email Address")
        .escape(),
    body("company")
        .trim()
        .notEmpty().withMessage("Copmany Name Can't Be Empty")
        .escape(),
    body("websiteType")
        .trim()
        .notEmpty().withMessage("Website Type Can't Be Empty")
        .escape(),
    body("message")
        .trim()
        .notEmpty().withMessage("Message Can't Be Empty")
        .escape(),
    
]

export default validateEmailBody