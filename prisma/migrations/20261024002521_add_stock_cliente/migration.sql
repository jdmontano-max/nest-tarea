/*
  Warnings:

  - Added the required column `cliente` to the `Pedido` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pedido" ADD COLUMN     "cliente" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Producto" ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 0;
