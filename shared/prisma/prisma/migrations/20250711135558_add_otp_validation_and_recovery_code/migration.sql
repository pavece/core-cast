/*
  Warnings:

  - You are about to drop the column `twoFASecret` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "twoFASecret",
ADD COLUMN     "OTPPendingValidation" BOOLEAN,
ADD COLUMN     "OTPRecoveryCode" TEXT,
ADD COLUMN     "OTPSecret" TEXT;
