# Salutem Lanches

Sistema de gerenciamento de pedidos para lanchonete desenvolvido com Angular e Spring Boot.

## Tecnologias

- **Frontend:** Angular 17, Bootstrap 5, TypeScript
- **Backend:** Java 17, Spring Boot 3, JPA, SQLite
- **Ferramentas:** Maven, Angular CLI

## Funcionalidades

- Cadastro de bebidas e ingredientes
- Montagem de hambúrgueres personalizados
- Gestão de pedidos com cálculo automático de preços

## Como Executar

### Backend (Spring Boot)
```bash
cd SalutemLanchesBack
./mvnw spring-boot:run
```
API rodando em: http://localhost:8080

### Frontend (Angular)

```bash
cd SalutemLanchesFront
npm install
ng serve
```

Aplicação rodando em: http://localhost:4200

## Endpoints da API

### Bebidas:

- GET /api/bebidas - Listar todas
- POST /api/bebidas - Criar nova
- PUT /api/bebidas/{id} - Atualizar
- DELETE /api/bebidas/{id} - Excluir
- GET /api/bebidas/pesquisa?termo=xxx - Pesquisar

### Ingredientes:

- GET /api/ingredientes - Listar todos
- POST /api/ingredientes - Criar novo
- PUT /api/ingredientes/{id} - Atualizar
- DELETE /api/ingredientes/{id} - Excluir
- GET /api/ingredientes/pesquisa?termo=xxx - Pesquisar

### Hamburgers:

- GET /api/hamburgers - Listar todos
- POST /api/hamburgers - Criar novo
- PUT /api/hamburgers/{id} - Atualizar
- DELETE /api/hamburgers/{id} - Excluir
- GET /api/hamburgers/pesquisa?termo=xxx - Pesquisar

### Pedidos:

- GET /api/pedidos - Listar todos
- POST /api/pedidos - Criar novo
- DELETE /api/pedidos/{id} - Excluir
- GET /api/pedidos/pesquisa?termo=xxx - Pesquisar
