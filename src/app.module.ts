import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { PrismaService } from './prisma/prisma.service';
import { PedidosModule } from './pedidos/pedidos.module';
import { ReservasController } from './reservas/reservas.controller';

@Module({
  imports: [ProductosModule, PedidosModule],
  controllers: [AppController, ReservasController],
  providers: [AppService, PrismaService],
})
export class AppModule {}