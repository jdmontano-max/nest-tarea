import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ProductosModule } from '../productos/productos.module';

@Module({
  imports: [ProductosModule],
  controllers: [PedidosController],
  providers: [PedidosService, PrismaService],
})
export class PedidosModule {}