-- DropForeignKey
ALTER TABLE "videoInteractions" DROP CONSTRAINT "videoInteractions_videoId_fkey";

-- DropForeignKey
ALTER TABLE "videoLike" DROP CONSTRAINT "videoLike_userId_fkey";

-- DropForeignKey
ALTER TABLE "videoLike" DROP CONSTRAINT "videoLike_videoId_fkey";

-- AddForeignKey
ALTER TABLE "videoInteractions" ADD CONSTRAINT "videoInteractions_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "videoLike" ADD CONSTRAINT "videoLike_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "videoLike" ADD CONSTRAINT "videoLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
