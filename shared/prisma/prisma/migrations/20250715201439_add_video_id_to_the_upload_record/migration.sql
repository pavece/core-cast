/*
  Warnings:

  - Added the required column `videoId` to the `upload` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "upload" ADD COLUMN     "videoId" TEXT NOT NULL;
