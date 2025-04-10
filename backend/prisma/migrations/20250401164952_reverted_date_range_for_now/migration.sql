/*
  Warnings:

  - You are about to drop the column `date_end` on the `pitches` table. All the data in the column will be lost.
  - You are about to drop the column `date_start` on the `pitches` table. All the data in the column will be lost.
  - Made the column `date` on table `pitches` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "pitches" DROP COLUMN "date_end",
DROP COLUMN "date_start",
ALTER COLUMN "date" SET NOT NULL;
