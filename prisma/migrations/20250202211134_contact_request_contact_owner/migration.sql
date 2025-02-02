/*
  Warnings:

  - You are about to drop the column `userId` on the `Contact` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ownerId,contactId]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownerId` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ContactRequestStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- DropIndex
DROP INDEX "Contact_userId_contactId_key";

-- DropIndex
DROP INDEX "Contact_userId_idx";

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "userId",
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ContactRequest" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,
    "status" "ContactRequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ContactRequest_recipientId_idx" ON "ContactRequest"("recipientId");

-- CreateIndex
CREATE INDEX "ContactRequest_senderId_idx" ON "ContactRequest"("senderId");

-- CreateIndex
CREATE UNIQUE INDEX "ContactRequest_senderId_recipientId_key" ON "ContactRequest"("senderId", "recipientId");

-- CreateIndex
CREATE INDEX "Contact_ownerId_idx" ON "Contact"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_ownerId_contactId_key" ON "Contact"("ownerId", "contactId");
