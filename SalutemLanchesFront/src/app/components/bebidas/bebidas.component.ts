import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Bebida } from '../../models/bebida.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-bebidas',
  standalone: true,  
  imports: [CommonModule, FormsModule], 
  templateUrl: './bebidas.component.html',
  // styleUrl: './bebidas.component.css'
})
export class BebidasComponent implements OnInit {
  bebidas: Bebida[] = [];
  bebida: Bebida = {
    codigo: '',
    descricao: '',
    precoUnitario: 0,
    possuiAcucar: false
  };
  
  modoEdicao = false;
  termoPesquisa = '';

  constructor(private apiService: ApiService) { }

gerarProximoCodigoBebida(): string {
  if (this.bebidas.length === 0) {
    return 'BEB001';
  }
  
  const ultimoCodigo = this.bebidas
    .map(b => b.codigo)
    .filter(codigo => codigo.startsWith('BEB'))
    .map(codigo => parseInt(codigo.replace('BEB', '')))
    .sort((a, b) => b - a)[0] || 0;
  
  return `BEB${(ultimoCodigo + 1).toString().padStart(3, '0')}`;
}

ngOnInit(): void {
  this.carregarBebidas().add(() => {
    this.bebida.codigo = this.gerarProximoCodigoBebida();
  });
}

  carregarBebidas(){
    return this.apiService.getBebidas().subscribe({
      next: (data) => {
        this.bebidas = data;
        this.bebida.codigo = this.gerarProximoCodigoBebida();
      },
      error: (error) => console.error('Erro ao carregar bebidas:', error)
    });
  }

  pesquisarBebidas(): void {
    if (this.termoPesquisa.trim()) {
      this.apiService.pesquisarBebidas(this.termoPesquisa).subscribe({
        next: (data) => this.bebidas = data,
        error: (error) => console.error('Erro na pesquisa:', error)
      });
    } else {
      this.carregarBebidas();
    }
  }

  salvarBebida(): void {
    if (this.modoEdicao && this.bebida.id) {
      this.apiService.updateBebida(this.bebida.id, this.bebida).subscribe({
        next: () => {
          this.carregarBebidas();
          this.limparFormulario();
        }
      });
    } else {
      this.apiService.createBebida(this.bebida).subscribe({
        next: () => {
          this.carregarBebidas();
          this.limparFormulario();
        }
      });
    }
  }

  editarBebida(bebida: Bebida): void {
    this.bebida = { ...bebida };
    this.modoEdicao = true;
  }

  excluirBebida(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta bebida?')) {
      this.apiService.deleteBebida(id).subscribe({
        next: () => this.carregarBebidas()
      });
    }
  }

  limparFormulario(): void {
    this.bebida = {
      codigo: '',
      descricao: '',
      precoUnitario: 0,
      possuiAcucar: false
    };
    this.modoEdicao = false;
  }
}