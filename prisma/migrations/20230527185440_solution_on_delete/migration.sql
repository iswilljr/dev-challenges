-- DropForeignKey
ALTER TABLE "Solution" DROP CONSTRAINT "Solution_challengeId_fkey";

-- AddForeignKey
ALTER TABLE "Solution" ADD CONSTRAINT "Solution_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;
