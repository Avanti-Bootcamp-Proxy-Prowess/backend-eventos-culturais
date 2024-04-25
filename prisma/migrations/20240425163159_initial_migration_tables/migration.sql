-- CreateTable
CREATE TABLE "Categorias" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "descricao" VARCHAR,

    CONSTRAINT "Categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Locais" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "endereco" VARCHAR(100) NOT NULL,
    "cidade" VARCHAR(100) NOT NULL,
    "estado" VARCHAR(100) NOT NULL,
    "pais" VARCHAR(100) NOT NULL,

    CONSTRAINT "Locais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Eventos" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "data_evento" DATE NOT NULL,
    "descricao" VARCHAR,
    "categoria_id" TEXT NOT NULL,
    "local_id" TEXT NOT NULL,

    CONSTRAINT "Eventos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Categorias_nome_key" ON "Categorias"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Locais_nome_key" ON "Locais"("nome");

-- AddForeignKey
ALTER TABLE "Eventos" ADD CONSTRAINT "Eventos_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "Categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Eventos" ADD CONSTRAINT "Eventos_local_id_fkey" FOREIGN KEY ("local_id") REFERENCES "Locais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
