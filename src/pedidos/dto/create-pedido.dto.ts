export class ProductoPedidoItemDto {
  idproducto: number | undefined;
  cantidad: number | undefined;
}

export class CreatePedidoDto {
  cliente: string | undefined;
  estado: string | undefined;
  productos: ProductoPedidoItemDto[] | undefined;
}