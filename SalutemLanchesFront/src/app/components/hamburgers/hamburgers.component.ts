import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Hamburger } from '../../models/hamburger.model';
import { Ingrediente } from '../../models/ingrediente.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-hamburgers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hamburgers.component.html',
//   styleUrl: './hamburgers.component.css'
})
export class HamburgersComponent implements OnInit {
  hamburgers: Hamburger[] = [];
  ingredientes: Ingrediente[] = [];
  paesDisponiveis: Ingrediente[] = []; 
  hamburger: Hamburger = {
    codigo: '',
    descricao: '',
    valor: 0,
    ingredientes: [],
    paoSelecionado: null 
  };
  
  modoEdicao = false;
  termoPesquisa = '';

  constructor(private apiService: ApiService) { }

gerarProximoCodigoHamburger(): string {
  if (this.hamburgers.length === 0) {
    return 'HAM001';
  }
  
  const ultimoCodigo = this.hamburgers
    .map(h => h.codigo)
    .filter(codigo => codigo.startsWith('HAM'))
    .map(codigo => parseInt(codigo.replace('HAM', '')))
    .sort((a, b) => b - a)[0] || 0;
  
  return `HAM${(ultimoCodigo + 1).toString().padStart(3, '0')}`;
}

ngOnInit(): void {
  this.carregarHamburgers().add(() => {
    this.hamburger.codigo = this.gerarProximoCodigoHamburger();
  });
  this.carregarIngredientes();
}

  carregarHamburgers() {
    return this.apiService.getHamburgers().subscribe({
      next: (data) => {
        this.hamburgers = data;
        this.hamburger.codigo = this.gerarProximoCodigoHamburger();
      },
      error: (error) => console.error('Erro ao carregar hamburgers:', error)
    });
  }

  carregarIngredientes(): void {
    this.apiService.getIngredientes().subscribe({
      next: (data) => {
        this.ingredientes = data;
        this.paesDisponiveis = data.filter(ingrediente => 
          ingrediente.descricao.toLowerCase().includes('pão') ||
          ingrediente.descricao.toLowerCase().includes('pao')
        );
      },
      error: (error) => console.error('Erro ao carregar ingredientes:', error)
    });
  }

  pesquisarHamburgers(): void {
    if (this.termoPesquisa.trim()) {
      this.apiService.pesquisarHamburgers(this.termoPesquisa).subscribe({
        next: (data) => this.hamburgers = data,
        error: (error) => console.error('Erro na pesquisa:', error)
      });
    } else {
      this.carregarHamburgers();
    }
  }

  salvarHamburger(): void {
    if (!this.hamburger.paoSelecionado) {
      alert('Selecione um tipo de pão para o hamburger!');
      return;
    }

    if (this.modoEdicao && this.hamburger.id) {
      this.apiService.updateHamburger(this.hamburger.id, this.hamburger).subscribe({
        next: () => {
          this.carregarHamburgers();
          this.limparFormulario();
        }
      });
    } else {
      this.apiService.createHamburger(this.hamburger).subscribe({
        next: () => {
          this.carregarHamburgers();
          this.limparFormulario();
        }
      });
    }
  }

  editarHamburger(hamburger: Hamburger): void {
    this.hamburger = { 
      ...hamburger,
      ingredientes: [...hamburger.ingredientes],
      paoSelecionado: hamburger.paoSelecionado || this.encontrarPaoNoHamburger(hamburger)
    };
    this.modoEdicao = true;
  }

  // Método para encontrar o pão nos ingredientes do hamburger (para edição)
  encontrarPaoNoHamburger(hamburger: Hamburger): Ingrediente | null {
    const pao = hamburger.ingredientes.find(ingrediente => 
      ingrediente.descricao.toLowerCase().includes('pão') ||
      ingrediente.descricao.toLowerCase().includes('pao')
    );
    return pao || null;
  }

  excluirHamburger(id: number): void {
    if (confirm('Tem certeza que deseja excluir este hamburger?')) {
      this.apiService.deleteHamburger(id).subscribe({
        next: () => this.carregarHamburgers()
      });
    }
  }

  limparFormulario(): void {
    this.hamburger = {
      codigo: '',
      descricao: '',
      valor: 0,
      ingredientes: [],
      paoSelecionado: null
    };
    this.modoEdicao = false;
  }

  toggleIngrediente(ingrediente: Ingrediente): void {
    if (this.isPao(ingrediente)) {
      return;
    }

    const index = this.hamburger.ingredientes.findIndex(i => i.id === ingrediente.id);
    
    if (index > -1) {
      this.hamburger.ingredientes.splice(index, 1);
    } else {
      this.hamburger.ingredientes.push(ingrediente);
    }
    
    this.calcularValorHamburger();
  }

  selecionarPao(pao: Ingrediente): void {
    if (this.hamburger.paoSelecionado) {
      const index = this.hamburger.ingredientes.findIndex(i => i.id === this.hamburger.paoSelecionado!.id);
      if (index > -1) {
        this.hamburger.ingredientes.splice(index, 1);
      }
    }

    this.hamburger.paoSelecionado = pao;
    this.hamburger.ingredientes.push(pao);
    
    this.calcularValorHamburger();
  }

  isIngredienteSelecionado(ingrediente: Ingrediente): boolean {
    return this.hamburger.ingredientes.some(i => i.id === ingrediente.id);
  }

  isPao(ingrediente: Ingrediente): boolean {
    return ingrediente.descricao.toLowerCase().includes('pão') ||
           ingrediente.descricao.toLowerCase().includes('pao');
  }

  calcularValorHamburger(): void {
    this.hamburger.valor = this.hamburger.ingredientes.reduce(
      (total, ingrediente) => total + ingrediente.precoUnitario, 
      0
    );
  }

  getIngredientesLista(ingredientes: Ingrediente[]): string {
    return ingredientes.map(i => i.descricao).join(', ');
  }

  calcularTotalHamburger(ingredientes: Ingrediente[]): number {
    return ingredientes.reduce((total, ingrediente) => total + ingrediente.precoUnitario, 0);
  }
}