/*
  Warnings:

  - Added the required column `role` to the `pitches` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pitches" ADD COLUMN     "role" TEXT NOT NULL;
