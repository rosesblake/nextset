-- AlterTable
ALTER TABLE "artists" ADD COLUMN     "tiktok" TEXT;

-- AlterTable
ALTER TABLE "venues" ALTER COLUMN "state" SET DATA TYPE VARCHAR(20);
