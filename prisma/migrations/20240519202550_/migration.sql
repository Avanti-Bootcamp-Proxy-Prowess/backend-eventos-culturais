/*
  Warnings:

  - Made the column `descricao` on table `categorias` required. This step will fail if there are existing NULL values in that column.
  - Made the column `descricao` on table `eventos` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "categorias" ALTER COLUMN "descricao" SET NOT NULL;

-- AlterTable
ALTER TABLE "eventos" ALTER COLUMN "descricao" SET NOT NULL;
