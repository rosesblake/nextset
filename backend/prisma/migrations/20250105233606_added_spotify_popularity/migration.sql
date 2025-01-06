/*
  Warnings:

  - You are about to drop the column `spotify_most_plays` on the `artists` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "artists" DROP COLUMN "spotify_most_plays",
ADD COLUMN     "spotify_popularity" INTEGER;
