import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bebida } from '../models/bebida.model';
import { Ingrediente } from '../models/ingrediente.model';
import { Hamburger } from '../models/hamburger.model';
import { Pedido } from '../models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  // ========== BEBIDAS ==========
  getBebidas(): Observable<Bebida[]> {
    return this.http.get<Bebida[]>(`${this.apiUrl}/bebidas`);
  }

  getBebida(id: number): Observable<Bebida> {
    return this.http.get<Bebida>(`${this.apiUrl}/bebidas/${id}`);
  }

  createBebida(bebida: Bebida): Observable<Bebida> {
    return this.http.post<Bebida>(`${this.apiUrl}/bebidas`, bebida);
  }

  updateBebida(id: number, bebida: Bebida): Observable<Bebida> {
    return this.http.put<Bebida>(`${this.apiUrl}/bebidas/${id}`, bebida);
  }

  deleteBebida(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/bebidas/${id}`);
  }

  pesquisarBebidas(termo: string): Observable<Bebida[]> {
    return this.http.get<Bebida[]>(`${this.apiUrl}/bebidas/pesquisa?termo=${termo}`);
  }

  // ========== INGREDIENTES ==========
  getIngredientes(): Observable<Ingrediente[]> {
    return this.http.get<Ingrediente[]>(`${this.apiUrl}/ingredientes`);
  }

  getIngrediente(id: number): Observable<Ingrediente> {
    return this.http.get<Ingrediente>(`${this.apiUrl}/ingredientes/${id}`);
  }

  createIngrediente(ingrediente: Ingrediente): Observable<Ingrediente> {
    return this.http.post<Ingrediente>(`${this.apiUrl}/ingredientes`, ingrediente);
  }

  updateIngrediente(id: number, ingrediente: Ingrediente): Observable<Ingrediente> {
    return this.http.put<Ingrediente>(`${this.apiUrl}/ingredientes/${id}`, ingrediente);
  }

  deleteIngrediente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/ingredientes/${id}`);
  }

  pesquisarIngredientes(termo: string): Observable<Ingrediente[]> {
    return this.http.get<Ingrediente[]>(`${this.apiUrl}/ingredientes/pesquisa?termo=${termo}`);
  }

  // ========== HAMBURGUERS ==========
  getHamburgers(): Observable<Hamburger[]> {
    return this.http.get<Hamburger[]>(`${this.apiUrl}/hamburgers`);
  }

  getHamburger(id: number): Observable<Hamburger> {
    return this.http.get<Hamburger>(`${this.apiUrl}/hamburgers/${id}`);
  }

  createHamburger(hamburger: Hamburger): Observable<Hamburger> {
    return this.http.post<Hamburger>(`${this.apiUrl}/hamburgers`, hamburger);
  }

  updateHamburger(id: number, hamburger: Hamburger): Observable<Hamburger> {
    return this.http.put<Hamburger>(`${this.apiUrl}/hamburgers/${id}`, hamburger);
  }

  deleteHamburger(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/hamburgers/${id}`);
  }

  pesquisarHamburgers(termo: string): Observable<Hamburger[]> {
    return this.http.get<Hamburger[]>(`${this.apiUrl}/hamburgers/pesquisa?termo=${termo}`);
  }

  // ========== PEDIDOS ==========
  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/pedidos`);
  }

  getPedido(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/pedidos/${id}`);
  }

  createPedido(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.apiUrl}/pedidos`, pedido);
  }

  updatePedido(id: number, pedido: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.apiUrl}/pedidos/${id}`, pedido);
  }

  deletePedido(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/pedidos/${id}`);
  }

  pesquisarPedidos(termo: string): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/pedidos/pesquisa?termo=${termo}`);
  }
}