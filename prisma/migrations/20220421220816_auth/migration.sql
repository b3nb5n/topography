/*
  Warnings:

  - A unique constraint covering the columns `[metaId]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `metaId` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_id_fkey";

-- AlterTable
ALTER TABLE "Collection" ALTER COLUMN "schema" SET DATA TYPE JSON;

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "host" TEXT,
ADD COLUMN     "metaId" CHAR(16) NOT NULL;

-- CreateTable
CREATE TABLE "Role" (
    "id" CHAR(16) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invitation" (
    "id" CHAR(16) NOT NULL,
    "email" TEXT NOT NULL,
    "roleId" CHAR(16) NOT NULL,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" CHAR(16) NOT NULL,
    "roleId" CHAR(16) NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Property_metaId_key" ON "Property"("metaId");

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_metaId_fkey" FOREIGN KEY ("metaId") REFERENCES "Meta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
