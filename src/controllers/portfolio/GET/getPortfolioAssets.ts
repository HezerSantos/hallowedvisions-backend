import { RequestHandler } from "express";
import getR2Object from "../../../services/getR2Object";
import prisma from "../../../config/prisma";
interface PortfolioProjects {
    id: number,
    name: string,
    description: string,
    demoUrl: string,
    type: string,
    imageName: string,
    languages: Record<string, Record<string, string>>[]
}


const getPortfolioAssets: RequestHandler = async(req, res, next) => {
    try{

        const promises = [
            getR2Object("hallowedvisions", "portfolioHeader.webp"), 
            prisma.portfolioItems.findMany({
                include: {
                    languages: {
                        select: {
                            language: {
                                select: {
                                    name: true,
                                },
                            },
                        },
                    },
                },
            })
        ]



        const [profileImageUrl, portfolioProjects] = await Promise.all(promises)
        const portfolioProjectPromises = portfolioProjects.map(async(project: PortfolioProjects) => {
            const imageUrl = await getR2Object("hallowedvisions", project.imageName)
            const languagesPrimitive = project.languages
            
            return {
                id: project.id,
                name: project.name,
                description: project.description,
                demoUrl: project.demoUrl,
                type: project.type,
                imageUrl: imageUrl,
                languages: languagesPrimitive.map(language => language.language.name)
            }
        })

        const finalPortfolioProjects = await Promise.all(portfolioProjectPromises)
        res.status(200).json({
            profileImageUrl: profileImageUrl,
            portfolioProjects: finalPortfolioProjects
        })
    }
     catch(error){
        next(error)
    }
}

export default getPortfolioAssets