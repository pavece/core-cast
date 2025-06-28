-- CreateTable
CREATE TABLE "upload" (
    "id" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "multipartId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "upload_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "upload_multipartId_key" ON "upload"("multipartId");
