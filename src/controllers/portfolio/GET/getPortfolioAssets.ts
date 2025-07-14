import { RequestHandler } from "express";
import getR2Object from "../../../services/getR2Object";

const getPortfolioAssets: RequestHandler = async(req, res, next) => {
    try{
        const profileImageUrl = await getR2Object("hallowedvisions", "portfolioHeader.webp")

        res.status(200).json({
            profileImageUrl: profileImageUrl
        })
    }
     catch(error){
        next(error)
    }
}

export default getPortfolioAssets