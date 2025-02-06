/*
  Warnings:

  - You are about to drop the column `hometown` on the `artists` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "artists" DROP COLUMN "hometown",
ADD COLUMN     "hometown_city" VARCHAR(50),
ADD COLUMN     "hometown_country" VARCHAR(50),
ADD COLUMN     "hometown_lat" DECIMAL(9,6),
ADD COLUMN     "hometown_lng" DECIMAL(9,6),
ADD COLUMN     "hometown_state" VARCHAR(20);
