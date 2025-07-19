/*
  Warnings:

  - A unique constraint covering the columns `[videoId]` on the table `videoInteractions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "videoInteractions_videoId_key" ON "videoInteractions"("videoId");
