import { RequestHandler } from "express";

const getHomeAssets: RequestHandler = (req, res, next) => {
    try{
        res.json({msg: "success"})
    } catch(error) {
        next(error)
    }
}

export default getHomeAssets