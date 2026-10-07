import { Get, Injectable, Patch, Post, Put } from '@nestjs/common';

@Injectable()
export class AppService {

  getUsers(): string {
    return 'Lista de usuarios';
  }

  getunusuario(id: string): string {
    return `Detalle del usuario con ID: ${id}`;
  }

  crear(): string {
    return 'Usuario creado';
  }

  putunusuario(id: string): string {
    return `Usuario actualizado con ID: ${id}`;
  }

  patchUser(id: string): string {
    return `Usuario modificado parcialmente con ID: ${id}`;
  }

  deleteusuario(id: string): string {
    return `Usuario eliminado con ID: ${id}`;
  }
}
