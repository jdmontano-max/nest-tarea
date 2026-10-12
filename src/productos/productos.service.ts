import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductosService {
  create(createProductoDto: CreateProductoDto) {
    return {
      mensaje: 'Producto creado correctamente',
      datos: createProductoDto,
    }
  }
  

  findAll() {
    return `lista de productos`;
  }

  findOne(id: number) {
    return `productos con id ${id}`;
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return{
      mensaje: `producto ${id} actualizado correctamente`,
      datos: updateProductoDto,
    }
  }

  remove(id: number) {
    return `producto ${id} eliminado`;
  }
}
