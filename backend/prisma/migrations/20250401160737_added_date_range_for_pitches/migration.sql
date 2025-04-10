/*
  Warnings:

  - Added the required column `date_end` to the `pitches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_start` to the `pitches` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pitches" ADD COLUMN     "date_end" DATE NOT NULL,
ADD COLUMN     "date_start" DATE NOT NULL,
ALTER COLUMN "date" DROP NOT NULL;
