# Sistema Pronta Entrega

Projeto acadêmico desenvolvido para a disciplina
Desenvolvimento de Sistemas Corporativos da UERN.

## 1. Descrição

O Pronta Entrega é um sistema web para gerenciamento
de uma loja de roupas que realiza vendas no atacado.

O sistema permite cadastrar produtos, gerenciar
clientes, registrar vendas, controlar o estoque
e consultar relatórios administrativos.

## 2. Tecnologias utilizadas

- Java 17
- Spring Boot 3
- Spring Security
- Spring Data JPA
- Hibernate
- MySQL 8
- Maven
- HTML
- CSS
- JavaScript

## 3. Funcionalidades

### Produtos

- Cadastrar produtos
- Consultar e pesquisar produtos
- Editar informações
- Excluir produtos
- Controlar quantidades em estoque

### Clientes

- Cadastrar clientes
- Consultar clientes
- Atualizar informações
- Excluir clientes

### Vendas

- Registrar vendas
- Adicionar vários produtos à mesma venda
- Calcular o valor total
- Consultar vendas realizadas
- Atualizar automaticamente o estoque

### Relatórios

- Consultar faturamento bruto
- Consultar quantidade de vendas
- Consultar quantidade de produtos
- Consultar unidades disponíveis em estoque

### Segurança

- Autenticação com Spring Security
- Senhas protegidas com BCrypt
- Proteção CSRF
- Perfis ADMIN e FUNCIONARIO
- Controle de acesso por permissões

## 4. Perfis de acesso

### Administrador

Pode gerenciar produtos, clientes e vendas,
além de consultar relatórios administrativos.

### Funcionário

Pode consultar produtos e registrar vendas,
mas não pode modificar o cadastro de produtos
nem acessar os relatórios administrativos.

## 5. Banco de dados

Banco utilizado: MySQL 8.

Nome do banco:

pronta_entrega

Tabelas principais:

- produtos
- clientes
- vendas
- itens_venda

## 6. Configuração

É necessário ter instalado:

- JDK 17
- Maven
- MySQL 8

Crie o banco de dados:

```sql
CREATE DATABASE IF NOT EXISTS pronta_entrega
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

Configure as variáveis de ambiente:

- DB_PASSWORD
- ADMIN_PASSWORD
- FUNCIONARIO_PASSWORD

A aplicação utiliza o usuário root do MySQL
na configuração acadêmica local.

As senhas não devem ser incluídas no código-fonte.

## 7. Execução

Na pasta principal do projeto, execute:

```bash
mvn spring-boot:run
```

Acesse:

http://localhost:8080/login.html

## 8. Telas

- Produtos: /
- Clientes: /clientes.html
- Vendas: /vendas.html
- Relatórios: /relatorios.html

## 9. Objetivo acadêmico

Aplicar conceitos de desenvolvimento de sistemas
corporativos, utilizando arquitetura em camadas,
persistência de dados, serviços web, autenticação
e controle de acesso.
