import { Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { PROPERTY_DEPS_METADATA } from '@nestjs/common/constants';
import path from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get("/users")
  getUsers(): string {
    return this.appService.getUsers();
  }

  @Get("/users/:id")
  getunusuario(@Param("id") id: string): string {
    return this.appService.getunusuario(id);
  }

  @Post("/users")
  post(): string {
    return this.appService.crear();
  }

  @Put("/users/:id")
  putunusuario(@Param("id") id: string): string {
    return this.appService.putunusuario(id);
  }

  @Patch("/users/:id")
  patchUser(@Param("id") id: string): string {
    return this.appService.patchUser(id);
  }

  @Delete("/users/:id")
  deleteusuario(@Param("id") id: string): string {
    return this.appService.deleteusuario(id);
  }
}
