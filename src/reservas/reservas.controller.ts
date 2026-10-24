import {
  Body,
  ConflictException,
  Controller,
  Delete,
  BadRequestException,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Res,
  UnprocessableEntityException,
} from '@nestjs/common';
import type { Response } from 'express';

interface Reserva {
  id: number;
  laboratorio: string;
  docente: string;
  hora: number;
}

const LABORATORIOS_VALIDOS = ['Lab 1', 'Lab 2', 'Lab 3'];
const HORA_MINIMA = 7;
const HORA_MAXIMA = 18;

@Controller('reservas')
export class ReservasController {
  // Las reservas viven en memoria: se pierden al reiniciar el servidor.
  private reservas: Reserva[] = [
    { id: 1, laboratorio: 'Lab 1', docente: 'Marta Loja', hora: 8 },
    { id: 2, laboratorio: 'Lab 2', docente: 'Luis Paredes', hora: 10 },
  ];

  // GET /reservas  y  GET /reservas?laboratorio=Lab 1
  @Get()
  findAll(@Query('laboratorio') laboratorio?: string) {
    if (laboratorio) {
      return this.reservas.filter((r) => r.laboratorio === laboratorio);
    }
    return this.reservas;
  }

  // GET /reservas/:id  (ParseIntPipe responde 400 si el id no es un número)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.buscarOFallar(id);
  }

  // POST /reservas
  @Post()
  create(
    @Body() body: { docente?: unknown; laboratorio?: unknown; hora?: unknown },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { docente, laboratorio, hora } = body ?? {};

    // 1. docente: texto no vacío
    if (typeof docente !== 'string' || docente.trim() === '') {
      throw new BadRequestException('El docente es obligatorio');
    }
    // 2. laboratorio: texto no vacío
    if (typeof laboratorio !== 'string' || laboratorio.trim() === '') {
      throw new BadRequestException('El laboratorio es obligatorio');
    }
    // 3. hora: número entero
    if (typeof hora !== 'number' || !Number.isInteger(hora)) {
      throw new BadRequestException('La hora debe ser un número entero');
    }
    // 4. el laboratorio debe existir
    if (!LABORATORIOS_VALIDOS.includes(laboratorio)) {
      throw new UnprocessableEntityException(
        `El laboratorio "${laboratorio}" no existe`,
      );
    }
    // 5. horario permitido
    if (hora < HORA_MINIMA || hora > HORA_MAXIMA) {
      throw new UnprocessableEntityException(
        'Solo se reserva entre las 7:00 y las 18:00',
      );
    }
    // 6. el laboratorio no debe estar ocupado a esa hora
    const ocupado = this.reservas.some(
      (r) => r.laboratorio === laboratorio && r.hora === hora,
    );
    if (ocupado) {
      throw new ConflictException(`${laboratorio} ya está reservado a las ${hora}:00`);
    }

    // Siguiente id libre
    const id = this.reservas.reduce((max, r) => Math.max(max, r.id), 0) + 1;
    const nueva: Reserva = { id, laboratorio, docente, hora };
    this.reservas.push(nueva);

    // 201 es el código por defecto de @Post(); solo falta la cabecera Location
    res.setHeader('Location', `/reservas/${id}`);
    return nueva;
  }

  // DELETE /reservas/:id
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    this.buscarOFallar(id);
    this.reservas = this.reservas.filter((r) => r.id !== id);
  }

  private buscarOFallar(id: number): Reserva {
    const reserva = this.reservas.find((r) => r.id === id);
    if (!reserva) {
      throw new NotFoundException(`No existe la reserva ${id}`);
    }
    return reserva;
  }
}