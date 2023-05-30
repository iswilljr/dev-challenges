/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Challenge` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[challengeId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Challenge" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "challengeId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Challenge_userId_key" ON "Challenge"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_challengeId_key" ON "User"("challengeId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE SET NULL ON UPDATE CASCADE;
