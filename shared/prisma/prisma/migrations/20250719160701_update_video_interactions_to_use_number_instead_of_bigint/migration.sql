/*
  Warnings:

  - You are about to alter the column `viewCount` on the `videoInteractions` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `likeCount` on the `videoInteractions` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "videoInteractions" ALTER COLUMN "viewCount" SET DATA TYPE INTEGER,
ALTER COLUMN "likeCount" SET DATA TYPE INTEGER;
