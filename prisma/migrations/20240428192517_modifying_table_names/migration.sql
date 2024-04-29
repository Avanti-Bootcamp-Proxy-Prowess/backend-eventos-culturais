/*
  Warnings:

  - You are about to drop the `Categorias` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Eventos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Locais` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Eventos" DROP CONSTRAINT "Eventos_categoria_id_fkey";

-- DropForeignKey
ALTER TABLE "Eventos" DROP CONSTRAINT "Eventos_local_id_fkey";

-- DropTable
DROP TABLE "Categorias";

-- DropTable
DROP TABLE "Eventos";

-- DropTable
DROP TABLE "Locais";

-- CreateTable
CREATE TABLE "categorias" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "descricao" VARCHAR,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locais" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "endereco" VARCHAR(100) NOT NULL,
    "cidade" VARCHAR(100) NOT NULL,
    "estado" VARCHAR(100) NOT NULL,
    "pais" VARCHAR(100) NOT NULL,

    CONSTRAINT "locais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eventos" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "data_evento" DATE NOT NULL,
    "descricao" VARCHAR,
    "categoria_id" TEXT NOT NULL,
    "local_id" TEXT NOT NULL,

    CONSTRAINT "eventos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categorias_nome_key" ON "categorias"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "locais_nome_key" ON "locais"("nome");

-- AddForeignKey
ALTER TABLE "eventos" ADD CONSTRAINT "eventos_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventos" ADD CONSTRAINT "eventos_local_id_fkey" FOREIGN KEY ("local_id") REFERENCES "locais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
