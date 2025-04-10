/*
  Warnings:

  - Added the required column `end_date` to the `pitches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `pitches` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pitches" ADD COLUMN     "end_date" DATE NOT NULL,
ADD COLUMN     "start_date" DATE NOT NULL;
