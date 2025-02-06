/*
  Warnings:

  - You are about to drop the column `hometown_city` on the `artists` table. All the data in the column will be lost.
  - You are about to drop the column `hometown_country` on the `artists` table. All the data in the column will be lost.
  - You are about to drop the column `hometown_lat` on the `artists` table. All the data in the column will be lost.
  - You are about to drop the column `hometown_lng` on the `artists` table. All the data in the column will be lost.
  - You are about to drop the column `hometown_state` on the `artists` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "artists" DROP COLUMN "hometown_city",
DROP COLUMN "hometown_country",
DROP COLUMN "hometown_lat",
DROP COLUMN "hometown_lng",
DROP COLUMN "hometown_state",
ADD COLUMN     "hometown" VARCHAR(30);
