/*
  Warnings:

  - You are about to drop the column `home_city` on the `artists` table. All the data in the column will be lost.
  - You are about to drop the column `home_state` on the `artists` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "artists" DROP COLUMN "home_city",
DROP COLUMN "home_state",
ADD COLUMN     "hometown" VARCHAR(30);
