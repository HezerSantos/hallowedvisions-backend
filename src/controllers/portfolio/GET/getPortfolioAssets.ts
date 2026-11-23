import { RequestHandler } from "express";
import getR2Object from "../../../services/getR2Object";
import prisma from "../../../config/prisma";
interface PortfolioProjects {
  id: number;
  name: string;
  description: string;
  demoUrl: string;
  type: string;
  imageName: string;
  languages: Record<string, Record<string, string>>[];
}

export interface WorkExperienceItemEntryBullet {
  id: string;
  text: string;
  order: number;
  workExperienceItemEntryId: string;
}

export interface WorkExperienceItemEntry {
  id: string;
  position: string;
  type: string;
  location: string;
  remote: boolean;
  startPeriod: number;
  endPeriod: number | null;
  orderNumber: number;
  workExperienceItemId: string;
  bullets: WorkExperienceItemEntryBullet[];
}

export interface WorkExperienceItem {
  id: string;
  name: string;
  imageKey: string;
  workExperienceItemEntries: WorkExperienceItemEntry[];
}

const getPortfolioAssets: RequestHandler = async (req, res, next) => {
  try {
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
      }),
      prisma.workExperienceItem.findMany({
        include: {
          workExperienceItemEntries: {
            orderBy: { orderNumber: "desc" },
            include: {
              bullets: {
                orderBy: { order: "desc" },
              },
            },
          },
        },
      }),
    ];

    const [profileImageUrl, portfolioProjects, workExperienceItemsInitial]: [
      string,
      PortfolioProjects[],
      WorkExperienceItem[],
    ] = (await Promise.all(promises)) as [
      string,
      PortfolioProjects[],
      WorkExperienceItem[],
    ];

    const portfolioProjectPromises = portfolioProjects.map(
      async (project: PortfolioProjects) => {
        const imageUrl = await getR2Object(
          "hallowedvisions",
          project.imageName as string,
        );
        const languagesPrimitive = project.languages;

        return {
          id: project.id,
          name: project.name,
          description: project.description,
          demoUrl: project.demoUrl,
          type: project.type,
          imageUrl: imageUrl,
          languages: languagesPrimitive.map(
            (language) => language.language.name,
          ),
        };
      },
    );

    const workExperienceItemsPromises = workExperienceItemsInitial.map(
      async (item) => {
        return {
          ...item,
          imageUrl: await getR2Object(
            "hallowedvisions",
            `workLogos/${item.imageKey}.webp`,
          ),
        };
      },
    );
    const [finalPortfolioProjects, workExperienceItems] = await Promise.all([
      Promise.all(portfolioProjectPromises),
      Promise.all(workExperienceItemsPromises),
    ]);
    res.status(200).json({
      profileImageUrl: profileImageUrl,
      portfolioProjects: finalPortfolioProjects,
      workExperienceItems,
    });
  } catch (error) {
    next(error);
  }
};

export default getPortfolioAssets;
