-- DropIndex
DROP INDEX "users_full_name_key";

-- AlterTable
ALTER TABLE "artists" ALTER COLUMN "spotify_id" SET DATA TYPE TEXT;
