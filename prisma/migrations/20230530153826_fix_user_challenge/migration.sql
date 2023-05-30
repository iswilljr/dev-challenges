-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_challengeId_fkey";

-- DropIndex
DROP INDEX "User_challengeId_key";

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
