/*
  Warnings:

  - You are about to alter the column `descricao` on the `categorias` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(255)`.
  - You are about to alter the column `descricao` on the `eventos` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(255)`.
  - Added the required column `usuario_id` to the `eventos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categorias" ALTER COLUMN "descricao" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "eventos" ADD COLUMN     "usuario_id" TEXT NOT NULL,
ALTER COLUMN "descricao" SET DATA TYPE VARCHAR(255);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "eventos" ADD CONSTRAINT "eventos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
