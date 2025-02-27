/*
  Warnings:

  - A unique constraint covering the columns `[chatId]` on the table `Group` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Group_chatId_key" ON "Group"("chatId");
