/*
  Warnings:

  - You are about to drop the column `date` on the `PortfolioItems` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PortfolioItems" DROP COLUMN "date",
ADD COLUMN     "month" TEXT,
ADD COLUMN     "year" TEXT;
