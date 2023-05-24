/*
  Warnings:

  - You are about to drop the column `score` on the `Challenge` table. All the data in the column will be lost.
  - Added the required column `difficulty` to the `Challenge` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('easy', 'medium', 'intermediate', 'hard', 'extreme');

-- AlterTable
ALTER TABLE "Challenge" DROP COLUMN "score",
ADD COLUMN     "difficulty" "Difficulty" NOT NULL;
