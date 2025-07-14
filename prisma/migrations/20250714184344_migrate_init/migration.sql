-- CreateTable
CREATE TABLE "PortfolioItems" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "PortfolioItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Languages" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortfolioLanguages" (
    "portfolioItemId" INTEGER NOT NULL,
    "languageId" INTEGER NOT NULL,

    CONSTRAINT "PortfolioLanguages_pkey" PRIMARY KEY ("portfolioItemId","languageId")
);

-- AddForeignKey
ALTER TABLE "PortfolioLanguages" ADD CONSTRAINT "PortfolioLanguages_portfolioItemId_fkey" FOREIGN KEY ("portfolioItemId") REFERENCES "PortfolioItems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioLanguages" ADD CONSTRAINT "PortfolioLanguages_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
