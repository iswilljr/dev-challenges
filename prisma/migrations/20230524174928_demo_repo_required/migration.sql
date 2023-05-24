/*
  Warnings:

  - Made the column `demoURL` on table `Solution` required. This step will fail if there are existing NULL values in that column.
  - Made the column `repoURL` on table `Solution` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Solution" ALTER COLUMN "demoURL" SET NOT NULL,
ALTER COLUMN "repoURL" SET NOT NULL;
