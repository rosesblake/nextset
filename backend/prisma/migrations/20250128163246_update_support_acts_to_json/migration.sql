/*
  Warnings:

  - The `support_acts` column on the `pitches` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "pitches" DROP COLUMN "support_acts",
ADD COLUMN     "support_acts" JSONB;
