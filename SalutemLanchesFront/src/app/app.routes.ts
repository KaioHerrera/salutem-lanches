import { Routes } from '@angular/router';
import { BebidasComponent } from './components/bebidas/bebidas.component';
import { IngredientesComponent } from './components/ingredientes/ingredientes.component';
import { HamburgersComponent } from './components/hamburgers/hamburgers.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';

export const routes: Routes = [
  { path: '', redirectTo: '/pedidos', pathMatch: 'full' }, 
  { path: 'bebidas', component: BebidasComponent },
  { path: 'ingredientes', component: IngredientesComponent },
  { path: 'hamburgers', component: HamburgersComponent },
  { path: 'pedidos', component: PedidosComponent }
];