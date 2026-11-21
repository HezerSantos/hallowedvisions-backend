import { RequestHandler } from "express";
import getR2Object from "../../../services/getR2Object";
import prisma from "../../../config/prisma";
import { Prisma } from "@prisma/client";
interface PortfolioProjects {
  id: number;
  name: string;
  description: string;
  demoUrl: string;
  type: string;
  imageName: string;
  languages: Record<string, Record<string, string>>[];
}

const workExperienceWithRelations =
  Prisma.validator<Prisma.WorkExperienceDefaultArgs>()({
    include: {
      bullets: {
        orderBy: { order: "asc" },
      },
      child: {
        include: {
          bullets: {
            orderBy: { order: "asc" },
          },
          child: true,
        },
      },
    },
  });

type WorkExperienceWithRelations = Prisma.WorkExperienceGetPayload<
  typeof workExperienceWithRelations
>;

type ExperienceNode = {
  id: number;
  name: string | null;
  type: string;
  imageKey: string | null;
  position: string;
  location: string;
  remote: boolean;
  startPeriod: number;
  endPeriod: number | null;
  parentId: number | null;
  bullets?: {
    id: number;
    text: string;
    order: number;
    workExperienceId: number;
  }[];
  child?: ExperienceNode | null;
};

interface ExperienceItem {
  header?: { name: string; imageUrl: string };
  meta: {
    position: string;
    type: "Full-time" | "Part-time" | "Internship";
    location: string;
    remote: boolean;
  };
  bullets?: string[];
  period: { start: number; end?: number };
  child?: ExperienceItem;
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
      prisma.workExperience.findMany({
        include: {
          bullets: {
            orderBy: { order: "asc" },
          },
          child: {
            include: {
              bullets: { orderBy: { order: "asc" } },
              child: true,
            },
          },
        },
        where: { parentId: null },
      }),
    ];

    const [profileImageUrl, portfolioProjects, workExperiences]: [
      string,
      PortfolioProjects[],
      WorkExperienceWithRelations[],
    ] = (await Promise.all(promises)) as [
      string,
      PortfolioProjects[],
      WorkExperienceWithRelations[],
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

    const experiencesPromises = workExperiences.map(async (e) => {
      const experienceItem: ExperienceItem = {
        meta: {
          position: e.position,
          type: e.type as "Full-time" | "Part-time" | "Internship",
          location: e.location,
          remote: e.remote,
        },
        period: { start: e.startPeriod, end: e.endPeriod ?? undefined },
        bullets: e.bullets.sort((a, b) => a.order - b.order).map((b) => b.text),
      };

      if (e.name && e.imageKey) {
        experienceItem["header"] = {
          name: e.name,
          imageUrl: await getR2Object(
            "hallowedvisions",
            `workLogos/${e.imageKey}.webp`,
          ),
        };
      }

      const dfs = (experienceItem: ExperienceItem, e?: ExperienceNode) => {
        if (!e) {
          return;
        }
        const experienceItemChild: ExperienceItem = {
          meta: {
            position: e.position,
            type: e.type as "Full-time" | "Part-time" | "Internship",
            location: e.location,
            remote: e.remote,
          },
          period: { start: e.startPeriod, end: e.endPeriod ?? undefined },
          bullets: e.bullets
            ?.sort((a, b) => a.order - b.order)
            .map((b) => b.text),
        };
        experienceItem.child = experienceItemChild;
        dfs(experienceItem.child, e.child ?? undefined);
      };

      dfs(experienceItem, e.child ?? undefined);
      return experienceItem;
    });

    const [finalPortfolioProjects, experiences] = await Promise.all([
      Promise.all(portfolioProjectPromises),
      Promise.all(experiencesPromises),
    ]);
    res.status(200).json({
      profileImageUrl: profileImageUrl,
      portfolioProjects: finalPortfolioProjects,
      experiences,
    });
  } catch (error) {
    next(error);
  }
};

export default getPortfolioAssets;
