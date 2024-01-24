/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Pessoa" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL,
    "photoPath" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL,

    CONSTRAINT "Pessoa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cracha" (
    "id" SERIAL NOT NULL,
    "color" TEXT NOT NULL,
    "pessoaId" INTEGER NOT NULL,

    CONSTRAINT "Cracha_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pessoa_email_key" ON "Pessoa"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Cracha_pessoaId_key" ON "Cracha"("pessoaId");

-- AddForeignKey
ALTER TABLE "Cracha" ADD CONSTRAINT "Cracha_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "Pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
