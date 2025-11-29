-- CreateTable
CREATE TABLE "ProjectImages" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "portfolioItemId" INTEGER NOT NULL,

    CONSTRAINT "ProjectImages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProjectImages" ADD CONSTRAINT "ProjectImages_portfolioItemId_fkey" FOREIGN KEY ("portfolioItemId") REFERENCES "PortfolioItems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
