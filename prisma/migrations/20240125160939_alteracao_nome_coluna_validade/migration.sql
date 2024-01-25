/*
  Warnings:

  - You are about to drop the column `validade` on the `Cracha` table. All the data in the column will be lost.
  - Added the required column `expirationDate` to the `Cracha` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cracha" DROP COLUMN "validade",
ADD COLUMN     "expirationDate" TIMESTAMP(3) NOT NULL;
