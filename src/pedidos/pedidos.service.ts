import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductosService } from '../productos/productos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

@Injectable()
export class PedidosService {
  constructor(
    private prisma: PrismaService,
    private productosService: ProductosService,
  ) {}

  async create(createPedidoDto: CreatePedidoDto) {
    const { cliente, estado } = createPedidoDto;
    const items = createPedidoDto.productos ?? [];

    if (typeof cliente !== 'string' || cliente.trim() === '') {
      throw new BadRequestException('El cliente es obligatorio');
    }

    // Se buscan todos los productos del pedido una sola vez
    const productos = await Promise.all(
      items.map((item) => this.productosService.findOne(item.idproducto as number)),
    );

    // Regla 1: el producto debe existir (422)
    items.forEach((item, i) => {
      if (!productos[i]) {
        throw new UnprocessableEntityException(
          `El producto ${item.idproducto} no existe`,
        );
      }
    });

    // Regla 2: la cantidad no puede superar el inventario (422)
    items.forEach((item, i) => {
      const producto = productos[i]!;
      const stock = (producto as typeof producto & { stock?: number }).stock;
      if (stock !== undefined && (item.cantidad as number) > stock) {
        throw new UnprocessableEntityException(
          `La cantidad pedida de "${producto.nombre}" supera el inventario (${stock})`,
        );
      }
    });

    // Regla 3: el cliente no repite un pedido pendiente (409)
    const pendiente = await this.prisma.pedido.findFirst({
      where: { cliente, estado: 'pendiente' },
    });
    if (pendiente) {
      throw new ConflictException(
        `El cliente "${cliente}" ya tiene un pedido pendiente`,
      );
    }

    return this.prisma.pedido.create({
      data: {
        cliente,
        estado: estado ?? 'pendiente',
        productos: {
          create: items.map((p) => ({
            idproducto: p.idproducto!,
            cantidad: p.cantidad!,
          })),
        },
      },
      include: { productos: { include: { producto: true } } },
    });
  }

  findAll() {
    return this.prisma.pedido.findMany({
      include: { productos: { include: { producto: true } } },
    });
  }

  findOne(id: number) {
    return this.prisma.pedido.findUnique({
      where: { id },
      include: { productos: { include: { producto: true } } },
    });
  }

  update(id: number, updatePedidoDto: UpdatePedidoDto) {
    return this.prisma.pedido.update({
      where: { id },
      data: { estado: updatePedidoDto.estado },
      include: { productos: { include: { producto: true } } },
    });
  }

  async remove(id: number) {
    // Primero se borran las filas de la tabla intermedia
    await this.prisma.productoPedido.deleteMany({ where: { idpedido: id } });
    return this.prisma.pedido.delete({ where: { id } });
  }
}