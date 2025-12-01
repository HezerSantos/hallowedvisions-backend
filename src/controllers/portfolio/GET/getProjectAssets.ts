import { RequestHandler } from "express";
import getR2Object, { retrieveProjectImages } from "../../../services/getR2Object";
import prisma from "../../../config/prisma";
import throwError from "../../../helpers/errorHelper";

const getProjectAssets: RequestHandler = async(req, res, next) => {
    try{
        const projectId = req.params.id

        const result = await prisma.portfolioItems.findUnique({
            where: { id: parseInt(projectId) },
            include: {
                languages: {
                    include: {
                        language: {
                            select: { name: true }
                        }
                    }
                }
            }
        })

        if (!result) {
            throwError("Error fetching dirKey", 400, [{msg: "Invalid Key", code: "INVALID_KEY"}])
            return
        }

        let signedUrls: string[] | (string | undefined)[] = []
        if (result.dirKey) {
            const data = (await retrieveProjectImages("hallowedvisions", `projects/${result.dirKey}`)).Contents?.filter(object => object.Size !== 0).map(object => object.Key)
            const signedUrlPromises = data?.map(async(object) => {
                if (object) {
                    return await getR2Object("hallowedvisions", object)
                }
            }) || []
            signedUrls = await Promise.all(signedUrlPromises)
        }

        let headerImage
        if (result.imageName) {
            headerImage = await getR2Object("hallowedvisions", result.imageName)
        }

        res.json({
            name: result.name,
            demoUrl: result.demoUrl,
            githubUrl: result.githubUrl,
            imageOne: headerImage,
            imageTwo: headerImage,
            aboutDescription: result.description,
            extendedDescription: result.extendedDescription,
            technologies: result.languages.map(languageJoin => languageJoin.language.name),
            gallery: signedUrls,
            month: result.month,
            year: result.year
        })
    } catch (error) {
        next(error)
    }
}

export default getProjectAssets