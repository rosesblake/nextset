/*
  Warnings:

  - The `zip_code` column on the `venues` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "venues" DROP COLUMN "zip_code",
ADD COLUMN     "zip_code" INTEGER;
