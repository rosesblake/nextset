/*
  Warnings:

  - The `spotify_id` column on the `artists` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[full_name]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "artists" DROP COLUMN "spotify_id",
ADD COLUMN     "spotify_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "users_full_name_key" ON "users"("full_name");
