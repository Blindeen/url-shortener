/*
  Warnings:

  - You are about to drop the column `name` on the `Permission` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[moduleId,operationId]` on the table `Permission` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `moduleId` to the `Permission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `operationId` to the `Permission` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Permission_name_key";

-- AlterTable
ALTER TABLE "public"."Permission" DROP COLUMN "name",
ADD COLUMN     "moduleId" BIGINT NOT NULL,
ADD COLUMN     "operationId" BIGINT NOT NULL;

-- CreateTable
CREATE TABLE "public"."Module" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Operation" (
    "id" BIGSERIAL NOT NULL,
    "read" BOOLEAN NOT NULL,
    "save" BOOLEAN NOT NULL,
    "delete" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Operation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Module_name_key" ON "public"."Module"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_moduleId_operationId_key" ON "public"."Permission"("moduleId", "operationId");

-- AddForeignKey
ALTER TABLE "public"."Permission" ADD CONSTRAINT "Permission_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "public"."Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Permission" ADD CONSTRAINT "Permission_operationId_fkey" FOREIGN KEY ("operationId") REFERENCES "public"."Operation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
