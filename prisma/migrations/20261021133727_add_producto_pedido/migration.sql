/*
  Warnings:

  - You are about to drop the column `cantidad` on the `Pedido` table. All the data in the column will be lost.
  - You are about to drop the column `idproducto` on the `Pedido` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pedido" DROP CONSTRAINT "Pedido_idproducto_fkey";

-- AlterTable
ALTER TABLE "Pedido" DROP COLUMN "cantidad",
DROP COLUMN "idproducto",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "ProductoPedido" (
    "id" SERIAL NOT NULL,
    "idpedido" INTEGER NOT NULL,
    "idproducto" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,

    CONSTRAINT "ProductoPedido_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductoPedido_idpedido_idproducto_key" ON "ProductoPedido"("idpedido", "idproducto");

-- AddForeignKey
ALTER TABLE "ProductoPedido" ADD CONSTRAINT "ProductoPedido_idpedido_fkey" FOREIGN KEY ("idpedido") REFERENCES "Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductoPedido" ADD CONSTRAINT "ProductoPedido_idproducto_fkey" FOREIGN KEY ("idproducto") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
