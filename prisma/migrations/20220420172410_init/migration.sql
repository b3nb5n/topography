-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('Property', 'Collection', 'Item');

-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('Live', 'Draft', 'Archived', 'Deleted');

-- CreateTable
CREATE TABLE "Meta" (
    "id" CHAR(16) NOT NULL,
    "type" "ResourceType" NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "edited" TIMESTAMP(3) NOT NULL,
    "visibility" "Visibility" NOT NULL DEFAULT E'Live',

    CONSTRAINT "Meta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Property" (
    "id" CHAR(16) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" CHAR(16) NOT NULL,
    "metaId" CHAR(16) NOT NULL,
    "propertyId" CHAR(16) NOT NULL,
    "schema" JSONB NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" CHAR(16) NOT NULL,
    "metaId" CHAR(16) NOT NULL,
    "collectionId" CHAR(16) NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Collection_metaId_key" ON "Collection"("metaId");

-- CreateIndex
CREATE UNIQUE INDEX "Item_metaId_key" ON "Item"("metaId");

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_id_fkey" FOREIGN KEY ("id") REFERENCES "Meta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_metaId_fkey" FOREIGN KEY ("metaId") REFERENCES "Meta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_metaId_fkey" FOREIGN KEY ("metaId") REFERENCES "Meta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
