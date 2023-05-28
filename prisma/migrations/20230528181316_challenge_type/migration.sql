/*
  Warnings:

  - The values [frameworks] on the enum `ChallengeType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ChallengeType_new" AS ENUM ('frontend', 'fullstack', 'responsive');
ALTER TABLE "Challenge" ALTER COLUMN "type" TYPE "ChallengeType_new" USING ("type"::text::"ChallengeType_new");
ALTER TYPE "ChallengeType" RENAME TO "ChallengeType_old";
ALTER TYPE "ChallengeType_new" RENAME TO "ChallengeType";
DROP TYPE "ChallengeType_old";
COMMIT;
