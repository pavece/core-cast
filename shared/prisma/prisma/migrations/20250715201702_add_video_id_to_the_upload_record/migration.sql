-- AddForeignKey
ALTER TABLE "upload" ADD CONSTRAINT "upload_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
