/*
  Warnings:

  - You are about to drop the column `available_dates` on the `venues` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "artists" ADD COLUMN     "stage_plot" TEXT;

-- AlterTable
ALTER TABLE "venues" DROP COLUMN "available_dates";

-- CreateTable
CREATE TABLE "venue_blocked_dates" (
    "id" SERIAL NOT NULL,
    "venue_id" INTEGER NOT NULL,
    "blocked_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "venue_blocked_dates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "venue_blocked_dates_venue_id_blocked_date_key" ON "venue_blocked_dates"("venue_id", "blocked_date");

-- AddForeignKey
ALTER TABLE "venue_blocked_dates" ADD CONSTRAINT "venue_blocked_dates_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "venues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
