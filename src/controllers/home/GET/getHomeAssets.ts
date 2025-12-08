import { RequestHandler } from "express";
import getR2Object from "../../../services/getR2Object";



interface cacheValue {
    value: string,
    expiration: number
}

const cache = new Map<string, cacheValue>()
const getHomeAssets: RequestHandler = async(req, res, next) => {
    try{
        const cachedValue = cache.get('url');
        if (cachedValue && cachedValue.expiration > Date.now()) {
            return res.json({ url: cachedValue.value });
        }

        const url = await getR2Object('hallowedvisions', "angelwingsO.glb")

        cache.set('url', {value: url, expiration: Date.now() + 3600000})
        res.json({url: url})
    } catch(error) {
        next(error)
    }
}

export default getHomeAssets