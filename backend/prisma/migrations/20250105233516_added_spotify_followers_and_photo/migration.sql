/*
  Warnings:

  - You are about to drop the column `spotify_monthly_listeners` on the `artists` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "artists" DROP COLUMN "spotify_monthly_listeners",
ADD COLUMN     "spotify_followers" INTEGER,
ADD COLUMN     "spotify_photo" TEXT;
