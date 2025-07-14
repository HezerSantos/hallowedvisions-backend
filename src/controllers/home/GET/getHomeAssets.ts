import { RequestHandler } from "express";
import getR2Object from "../../../services/getR2Object";

const getHomeAssets: RequestHandler = async(req, res, next) => {
    try{
        const url = await getR2Object('hallowedvisions', "angelwingsO.glb")
        res.json({url: url})
    } catch(error) {
        next(error)
    }
}

export default getHomeAssets