import { Ingrediente } from './ingrediente.model';

export interface Hamburger {
  id?: number;
  codigo: string;
  descricao: string;
  valor: number;
  ingredientes: Ingrediente[];
  paoSelecionado?: Ingrediente | null; 
}