import { Hamburger } from './hamburger.model';
import { Bebida } from './bebida.model';

export interface Pedido {
  id?: number;
  codigo: string;
  dataPedido?: string;
  descricao: string;
  nomeCliente: string;
  enderecoCliente: string;
  telefoneCliente: string;
  hamburgers: Hamburger[];
  bebidas: Bebida[];
  observacoes: string[];
}
