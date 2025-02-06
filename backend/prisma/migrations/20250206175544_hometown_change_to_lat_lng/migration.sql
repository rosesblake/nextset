/*
  Warnings:

  - You are about to drop the column `hometown` on the `artists` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "artists" DROP COLUMN "hometown",
ADD COLUMN     "hometown_city" TEXT,
ADD COLUMN     "hometown_country" TEXT,
ADD COLUMN     "hometown_lat" TEXT,
ADD COLUMN     "hometown_lng" TEXT,
ADD COLUMN     "hometown_state" TEXT;
