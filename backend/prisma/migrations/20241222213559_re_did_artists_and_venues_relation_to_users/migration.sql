/*
  Warnings:

  - Added the required column `created_by` to the `artists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `venues` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "artists" ADD COLUMN     "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_by" INTEGER NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

-- AlterTable
ALTER TABLE "venues" ADD COLUMN     "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_by" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "artist_users" (
    "user_id" INTEGER NOT NULL,
    "artist_id" INTEGER NOT NULL,
    "role" TEXT,

    CONSTRAINT "artist_users_pkey" PRIMARY KEY ("user_id","artist_id")
);

-- CreateTable
CREATE TABLE "venue_users" (
    "user_id" INTEGER NOT NULL,
    "venue_id" INTEGER NOT NULL,
    "role" TEXT,

    CONSTRAINT "venue_users_pkey" PRIMARY KEY ("user_id","venue_id")
);

-- AddForeignKey
ALTER TABLE "artists" ADD CONSTRAINT "artists_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venues" ADD CONSTRAINT "venues_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "artist_users" ADD CONSTRAINT "artist_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "artist_users" ADD CONSTRAINT "artist_users_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "artists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venue_users" ADD CONSTRAINT "venue_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venue_users" ADD CONSTRAINT "venue_users_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "venues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
