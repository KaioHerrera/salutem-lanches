import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pedido } from '../../models/pedido.model';
import { Hamburger } from '../../models/hamburger.model';
import { Bebida } from '../../models/bebida.model';
import { Ingrediente } from '../../models/ingrediente.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pedidos.component.html',
})
export class PedidosComponent implements OnInit {
  pedidos: Pedido[] = [];
  hamburgers: Hamburger[] = [];
  bebidas: Bebida[] = [];
  ingredientesAdicionais: Ingrediente[] = []; 
  
  pedido: Pedido = {
    codigo: '',
    descricao: '',
    nomeCliente: '',
    enderecoCliente: '',
    telefoneCliente: '',
    hamburgers: [],
    bebidas: [],
    observacoes: []
  };

  novaObservacao: string = '';
  termoPesquisa: string = '';
  hamburgerSelecionadoId: string = '';
  bebidaSelecionadaId: string = '';

  adicionaisPorHamburger: Ingrediente[][] = [];

  constructor(private apiService: ApiService) { }

  gerarProximoCodigo(): string {
  if (this.pedidos.length === 0) {
    return 'PED001';
  }
  
  const ultimoCodigo = this.pedidos
    .map(p => p.codigo)
    .filter(codigo => codigo.startsWith('PED'))
    .map(codigo => parseInt(codigo.replace('PED', '')))
    .sort((a, b) => b - a)[0] || 0;
  
  const proximoNumero = ultimoCodigo + 1;
  return `PED${proximoNumero.toString().padStart(3, '0')}`;
}

  ngOnInit(): void {
    this.carregarPedidos();
    this.carregarHamburgers();
    this.carregarBebidas();
    this.carregarIngredientesAdicionais();
    this.carregarPedidos().add(() => {
    this.pedido.codigo = this.gerarProximoCodigo();
  });
  }

carregarPedidos() {
  return this.apiService.getPedidos().subscribe({
    next: (data) => {
      this.pedidos = data;
      this.pedido.codigo = this.gerarProximoCodigo();
    },
    error: (error) => console.error('Erro ao carregar pedidos:', error)
  });
}

  carregarHamburgers(): void {
    this.apiService.getHamburgers().subscribe({
      next: (data) => this.hamburgers = data,
      error: (error) => console.error('Erro ao carregar hamburgers:', error)
    });
  }

  carregarBebidas(): void {
    this.apiService.getBebidas().subscribe({
      next: (data) => this.bebidas = data,
      error: (error) => console.error('Erro ao carregar bebidas:', error)
    });
  }

  carregarIngredientesAdicionais(): void {
    this.apiService.getIngredientes().subscribe({
      next: (data) => {
        this.ingredientesAdicionais = data.filter(ingrediente => ingrediente.ehAdicional);
      },
      error: (error) => console.error('Erro ao carregar ingredientes:', error)
    });
  }

  pesquisarPedidos(): void {
    if (this.termoPesquisa.trim()) {
      this.apiService.pesquisarPedidos(this.termoPesquisa).subscribe({
        next: (data) => this.pedidos = data,
        error: (error) => console.error('Erro na pesquisa:', error)
      });
    } else {
      this.carregarPedidos();
    }
  }

  adicionarHamburger(): void {
    const hamburger = this.hamburgers.find(h => h.id === +this.hamburgerSelecionadoId);
    if (hamburger) {
      this.pedido.hamburgers.push({...hamburger});
      this.adicionaisPorHamburger.push([]); 
      this.hamburgerSelecionadoId = ''; 
    }
  }

  removerHamburger(index: number): void {
    this.pedido.hamburgers.splice(index, 1);
    this.adicionaisPorHamburger.splice(index, 1);
  }

  adicionarBebida(): void {
    const bebida = this.bebidas.find(b => b.id === +this.bebidaSelecionadaId);
    if (bebida) {
      this.pedido.bebidas.push({...bebida});
      this.bebidaSelecionadaId = '';
    }
  }

  removerBebida(index: number): void {
    this.pedido.bebidas.splice(index, 1);
  }

  adicionarAdicional(hamburgerIndex: number, event: any): void {
    const adicionalId = event.target.value;
    if (!adicionalId) return;
    
    const adicional = this.ingredientesAdicionais.find(a => a.id === +adicionalId);
    if (adicional) {
      this.adicionaisPorHamburger[hamburgerIndex].push(adicional);
      event.target.value = '';
    }
  }

  removerAdicional(hamburgerIndex: number, adicionalIndex: number): void {
    this.adicionaisPorHamburger[hamburgerIndex].splice(adicionalIndex, 1);
  }

  getAdicionais(hamburgerIndex: number): Ingrediente[] {
    return this.adicionaisPorHamburger[hamburgerIndex] || [];
  }

  adicionarObservacao(): void {
    if (this.novaObservacao.trim()) {
      this.pedido.observacoes.push(this.novaObservacao.trim());
      this.novaObservacao = '';
    }
  }

  removerObservacao(index: number): void {
    this.pedido.observacoes.splice(index, 1);
  }

  calcularTotalPedido(): number {
    let total = 0;
    
    this.pedido.hamburgers.forEach((hamburger, index) => {
      total += hamburger.valor;
      this.getAdicionais(index).forEach(adicional => {
        total += adicional.precoUnitario;
      });
    });
    
    total += this.pedido.bebidas.reduce((sum, bebida) => sum + bebida.precoUnitario, 0);
    
    return total;
  }

  calcularTotalPedidoItem(pedido: Pedido): number {
    const totalHamburgers = pedido.hamburgers.reduce((total, hamburger) => total + hamburger.valor, 0);
    const totalBebidas = pedido.bebidas.reduce((total, bebida) => total + bebida.precoUnitario, 0);
    return totalHamburgers + totalBebidas;
  }

  salvarPedido(): void {
    this.pedido.observacoes = this.pedido.observacoes.filter(obs => obs.trim() !== '');

    this.apiService.createPedido(this.pedido).subscribe({
      next: () => {
        this.carregarPedidos();
        this.limparFormulario();
      },
      error: (error) => console.error('Erro ao criar pedido:', error)
    });
  }

  limparFormulario(): void {
    this.pedido = {
      codigo: '',
      descricao: '',
      nomeCliente: '',
      enderecoCliente: '',
      telefoneCliente: '',
      hamburgers: [],
      bebidas: [],
      observacoes: []
    };
    this.novaObservacao = '';
    this.hamburgerSelecionadoId = '';
    this.bebidaSelecionadaId = '';
    this.adicionaisPorHamburger = [];
  }

  formatarTelefone(event: any): void {
  let value = event.target.value.replace(/\D/g, '');
  
  if (value.length > 11) {
    value = value.substring(0, 11);
  }
  
  if (value.length > 10) {
    value = value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else if (value.length > 6) {
    value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  } else if (value.length > 2) {
    value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
  } else if (value.length > 0) {
    value = value.replace(/^(\d{0,2})/, '($1');
  }
  
  this.pedido.telefoneCliente = value;
  event.target.value = value;
}

  excluirPedido(id: number): void {
    if (confirm('Tem certeza que deseja excluir este pedido?')) {
      this.apiService.deletePedido(id).subscribe({
        next: () => this.carregarPedidos()
      });
    }
  }
}