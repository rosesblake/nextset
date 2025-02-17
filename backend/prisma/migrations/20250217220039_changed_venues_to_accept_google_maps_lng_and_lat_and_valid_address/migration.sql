/*
  Warnings:

  - You are about to drop the column `address` on the `venues` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "venues" DROP COLUMN "address",
ADD COLUMN     "full_address" VARCHAR(50),
ADD COLUMN     "lat" INTEGER,
ADD COLUMN     "lng" INTEGER,
ADD COLUMN     "street" VARCHAR(50);
