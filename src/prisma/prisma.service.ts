import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { CreateProductoDto } from '../productos/dto/create-producto.dto';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy 
{
    create(createproductoDto: CreateProductoDto) {
        return {
            mensaje: 'Producto creado correctamente',
            datos: createproductoDto,
        }
    }

    constructor(){
        const adapter = new PrismaPg({
            connectionString: process.env.DATABASE_URL,
        })
        super({ adapter });
    }

    async onModuleInit() {
        await this.$connect();
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
}

