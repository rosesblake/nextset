/*
  Warnings:

  - You are about to drop the `pitch_artists` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `date` to the `pitches` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pitch_artists" DROP CONSTRAINT "pitch_artists_artist_id_fkey";

-- DropForeignKey
ALTER TABLE "pitch_artists" DROP CONSTRAINT "pitch_artists_pitch_id_fkey";

-- AlterTable
ALTER TABLE "pitches" ADD COLUMN     "date" DATE NOT NULL,
ADD COLUMN     "support_acts" VARCHAR(30);

-- DropTable
DROP TABLE "pitch_artists";

-- CreateTable
CREATE TABLE "artist_pitches" (
    "pitch_id" INTEGER NOT NULL,
    "artist_id" INTEGER NOT NULL,

    CONSTRAINT "artist_pitches_pkey" PRIMARY KEY ("pitch_id","artist_id")
);

-- AddForeignKey
ALTER TABLE "artist_pitches" ADD CONSTRAINT "artist_pitches_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "artist_pitches" ADD CONSTRAINT "artist_pitches_pitch_id_fkey" FOREIGN KEY ("pitch_id") REFERENCES "pitches"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
