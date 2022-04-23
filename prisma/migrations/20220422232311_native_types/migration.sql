/*
  Warnings:

  - You are about to alter the column `email` on the `Invitation` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(32)`.
  - You are about to alter the column `host` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(64)`.
  - You are about to alter the column `name` on the `Role` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(32)`.
  - You are about to alter the column `firstName` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(32)`.
  - You are about to alter the column `lastName` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(32)`.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `data` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invitation" ALTER COLUMN "email" SET DATA TYPE VARCHAR(32);

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "data" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Property" ALTER COLUMN "host" SET DATA TYPE VARCHAR(64);

-- AlterTable
ALTER TABLE "Role" ALTER COLUMN "name" SET DATA TYPE VARCHAR(32);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "firstName" SET DATA TYPE VARCHAR(32),
ALTER COLUMN "lastName" SET DATA TYPE VARCHAR(32);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
