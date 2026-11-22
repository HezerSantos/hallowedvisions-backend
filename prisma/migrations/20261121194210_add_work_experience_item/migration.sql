-- CreateTable
CREATE TABLE "WorkExperienceItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageKey" TEXT NOT NULL,

    CONSTRAINT "WorkExperienceItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkExperienceItemEntry" (
    "id" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "remote" BOOLEAN NOT NULL,
    "startPeriod" INTEGER NOT NULL,
    "endPeriod" INTEGER,
    "orderNumber" INTEGER NOT NULL DEFAULT 0,
    "workExperienceItemId" TEXT NOT NULL,

    CONSTRAINT "WorkExperienceItemEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkExperienceItemEntryBullets" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "workExperienceItemEntryId" TEXT NOT NULL,

    CONSTRAINT "WorkExperienceItemEntryBullets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkExperienceItemEntry" ADD CONSTRAINT "WorkExperienceItemEntry_workExperienceItemId_fkey" FOREIGN KEY ("workExperienceItemId") REFERENCES "WorkExperienceItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkExperienceItemEntryBullets" ADD CONSTRAINT "WorkExperienceItemEntryBullets_workExperienceItemEntryId_fkey" FOREIGN KEY ("workExperienceItemEntryId") REFERENCES "WorkExperienceItemEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
