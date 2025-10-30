import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ingrediente } from '../../models/ingrediente.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-ingredientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ingredientes.component.html',
//   styleUrl: './ingredientes.component.css'
})
export class IngredientesComponent implements OnInit {
  ingredientes: Ingrediente[] = [];
  ingrediente: Ingrediente = {
    codigo: '',
    descricao: '',
    precoUnitario: 0,
    ehAdicional: false
  };
  
  modoEdicao = false;
  termoPesquisa = '';

  constructor(private apiService: ApiService) { }

gerarProximoCodigoIngrediente(): string {
  if (this.ingredientes.length === 0) {
    return 'ING001';
  }
  
  const ultimoCodigo = this.ingredientes
    .map(i => i.codigo)
    .filter(codigo => codigo.startsWith('ING'))
    .map(codigo => parseInt(codigo.replace('ING', '')))
    .sort((a, b) => b - a)[0] || 0;
  
  return `ING${(ultimoCodigo + 1).toString().padStart(3, '0')}`;
}

ngOnInit(): void {
  this.carregarIngredientes().add(() => {
    this.ingrediente.codigo = this.gerarProximoCodigoIngrediente();
  });
}

  carregarIngredientes() {
    return this.apiService.getIngredientes().subscribe({
      next: (data) => {
      this.ingredientes = data, 
      this.ingrediente.codigo = this.gerarProximoCodigoIngrediente();
      },
      error: (error) => console.error('Erro ao carregar ingredientes:', error)
    });
  }

  pesquisarIngredientes(): void {
    if (this.termoPesquisa.trim()) {
      this.apiService.pesquisarIngredientes(this.termoPesquisa).subscribe({
        next: (data) => this.ingredientes = data,
        error: (error) => console.error('Erro na pesquisa:', error)
      });
    } else {
      this.carregarIngredientes();
    }
  }

  salvarIngrediente(): void {
    if (this.modoEdicao && this.ingrediente.id) {
      this.apiService.updateIngrediente(this.ingrediente.id, this.ingrediente).subscribe({
        next: () => {
          this.carregarIngredientes();
          this.limparFormulario();
        }
      });
    } else {
      this.apiService.createIngrediente(this.ingrediente).subscribe({
        next: () => {
          this.carregarIngredientes();
          this.limparFormulario();
        }
      });
    }
  }

  editarIngrediente(ingrediente: Ingrediente): void {
    this.ingrediente = { ...ingrediente };
    this.modoEdicao = true;
  }

  excluirIngrediente(id: number): void {
    if (confirm('Tem certeza que deseja excluir este ingrediente?')) {
      this.apiService.deleteIngrediente(id).subscribe({
        next: () => this.carregarIngredientes()
      });
    }
  }

  limparFormulario(): void {
    this.ingrediente = {
      codigo: '',
      descricao: '',
      precoUnitario: 0,
      ehAdicional: false
    };
    this.modoEdicao = false;
  }
}