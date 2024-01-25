/*
  Warnings:

  - You are about to drop the column `color` on the `Cracha` table. All the data in the column will be lost.
  - You are about to drop the column `photoPath` on the `Pessoa` table. All the data in the column will be lost.
  - You are about to drop the column `verified` on the `Pessoa` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[CPF]` on the table `Pessoa` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `photoPath` to the `Cracha` table without a default value. This is not possible if the table is not empty.
  - Added the required column `validade` to the `Cracha` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verified` to the `Cracha` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CPF` to the `Pessoa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Pessoa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cracha" DROP COLUMN "color",
ADD COLUMN     "photoPath" TEXT NOT NULL,
ADD COLUMN     "validade" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "verified" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Pessoa" DROP COLUMN "photoPath",
DROP COLUMN "verified",
ADD COLUMN     "CPF" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Pessoa_CPF_key" ON "Pessoa"("CPF");
