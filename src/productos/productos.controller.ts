import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productsService: ProductosService) {}

  @Post()
  create(@Body() createProductDto: CreateProductoDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }

  @Post(':id')
  update(@Param('id') id: number, @Body() updateProductDto: Partial<CreateProductoDto>) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productsService.remove(id);
  }
}
