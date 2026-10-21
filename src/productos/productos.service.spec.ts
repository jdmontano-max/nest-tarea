import { Test, TestingModule } from '@nestjs/testing';
import { ProductosService } from './productos.service';
import { UpdateProductoDto } from './dto/update-producto.dto';
import assert from 'node:assert/strict';
import { beforeEach, describe, it } from 'node:test';


describe('ProductosService', () => {
  let service: ProductosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductosService],
    }).compile();

    service = module.get<ProductosService>(ProductosService);
  });

  it('should be defined', () => {
    assert(service);
  });
});


