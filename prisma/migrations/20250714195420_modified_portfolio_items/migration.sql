/*
  Warnings:

  - Added the required column `demoUrl` to the `PortfolioItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `PortfolioItems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PortfolioItems" ADD COLUMN     "demoUrl" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
