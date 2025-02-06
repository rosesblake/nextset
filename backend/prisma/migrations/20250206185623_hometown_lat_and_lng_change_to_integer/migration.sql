/*
  Warnings:

  - The `hometown_lat` column on the `artists` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `hometown_lng` column on the `artists` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "artists" ADD COLUMN     "apple_music_url" TEXT,
DROP COLUMN "hometown_lat",
ADD COLUMN     "hometown_lat" INTEGER,
DROP COLUMN "hometown_lng",
ADD COLUMN     "hometown_lng" INTEGER;
