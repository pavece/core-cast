-- DropForeignKey
ALTER TABLE "upload" DROP CONSTRAINT "upload_user_fkey";

-- DropForeignKey
ALTER TABLE "upload" DROP CONSTRAINT "upload_videoId_fkey";

-- DropForeignKey
ALTER TABLE "video" DROP CONSTRAINT "video_userId_fkey";

-- DropForeignKey
ALTER TABLE "videoProcessingTask" DROP CONSTRAINT "videoProcessingTask_videoId_fkey";

-- AddForeignKey
ALTER TABLE "video" ADD CONSTRAINT "video_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "upload" ADD CONSTRAINT "upload_user_fkey" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "upload" ADD CONSTRAINT "upload_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "videoProcessingTask" ADD CONSTRAINT "videoProcessingTask_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE CASCADE ON UPDATE CASCADE;
