-- AlterTable
ALTER TABLE "video" ADD COLUMN     "popularitScore" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "video_popularitScore_idx" ON "video"("popularitScore");
