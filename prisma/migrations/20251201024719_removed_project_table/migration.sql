/*
  Warnings:

  - You are about to drop the `ProjectImages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProjectImages" DROP CONSTRAINT "ProjectImages_portfolioItemId_fkey";

-- AlterTable
ALTER TABLE "PortfolioItems" ADD COLUMN     "dirKey" TEXT;

-- DropTable
DROP TABLE "ProjectImages";
