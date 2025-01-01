/*
  Warnings:

  - Added the required column `genre` to the `artists` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "artists" ADD COLUMN     "genre" VARCHAR(20) NOT NULL,
ADD COLUMN     "spotify_url" TEXT;
