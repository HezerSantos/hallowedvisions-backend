import { RequestHandler } from "express";
import { v7 } from "uuid";
import prisma from "../../config/prisma";
import validateWorkExperienceBody from "../../validation/portfolio/createWorkExperienceValidator";
import { validationResult } from "express-validator";
import throwError from "../../helpers/errorHelper";

interface WorkExperienceItemEntryBullet {
  text: string;
  order: number;
}

interface WorkExperienceItemEntry {
  position: string;
  type: string;
  location: string;
  remote: boolean;
  startPeriod: number;
  endPeriod: number | null;
  orderNumber: number;
  bullets: WorkExperienceItemEntryBullet[];
}

interface WorkExperienceItem {
  name: string;
  imageKey: string;
  workExperienceItemEntries: WorkExperienceItemEntry[];
}

interface WorkExperienceBody {
  workExperienceItem: WorkExperienceItem;
}
const createWorkExperienceController: RequestHandler[] = [
  ...validateWorkExperienceBody,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throwError("Bad Request", 400, [{ errors: errors.array() }]);
        return;
      }

      const body = req.body as WorkExperienceBody;
      const source = body.workExperienceItem;

      const newWorkExperienceItemId = v7();

      await prisma.workExperienceItem.create({
        data: {
          id: newWorkExperienceItemId,
          name: source.name,
          imageKey: source.imageKey,
          workExperienceItemEntries: {
            create: (source.workExperienceItemEntries ?? []).map(
              (entry, entryIdx) => {
                const newEntryId = v7();

                return {
                  id: newEntryId,
                  position: entry.position,
                  type: entry.type,
                  location: entry.location,
                  remote: entry.remote,
                  startPeriod: entry.startPeriod,
                  endPeriod: entry.endPeriod ?? null,
                  orderNumber: entry.orderNumber ?? entryIdx,
                  bullets: {
                    create: (entry.bullets ?? []).map((bullet, bulletIdx) => ({
                      id: v7(),
                      text: bullet.text,
                      order: bullet.order ?? bulletIdx,
                    })),
                  },
                };
              },
            ),
          },
        },
      });

      res.status(201).end();
    } catch (error) {
      next(error);
    }
  },
];

export default createWorkExperienceController;
