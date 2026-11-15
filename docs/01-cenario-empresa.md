# 1. Definição do Cenário da Empresa Fictícia

## 1.1. Apresentação da empresa

A Pronta Entrega é uma empresa fictícia que atua no comércio atacadista de roupas, oferecendo produtos como camisetas, calças e bermudas.

Com o crescimento das vendas, surgiu a necessidade de organizar melhor o cadastro de produtos, as informações dos clientes e o controle do estoque.

Para atender a essas necessidades, foi desenvolvido o Sistema Pronta Entrega, uma aplicação web que permite gerenciar as principais atividades da empresa de maneira simples e organizada.

## 1.2. Objetivo do sistema

O objetivo do sistema é facilitar o gerenciamento das atividades da loja, permitindo cadastrar produtos e clientes, registrar vendas, atualizar automaticamente o estoque e consultar relatórios.

O sistema também possui controle de acesso, permitindo que administradores e funcionários utilizem funcionalidades diferentes, de acordo com suas permissões.

## 1.3. Tecnologias utilizadas

O sistema foi desenvolvido utilizando Java 17 e Spring Boot, com integração ao banco de dados MySQL 8.

A interface foi construída com HTML5, CSS3 e JavaScript.

Também foram utilizados Spring Data JPA e Hibernate para persistência de dados, Spring Security para autenticação e autorização, Maven para gerenciamento das dependências e GitHub para versionamento e disponibilização do projeto.

## 1.4. Arquitetura MVC em três camadas

O Sistema Pronta Entrega foi organizado em três camadas principais:

**Camada de Visão (Aplicação):**

Responsável pela interface apresentada ao usuário. Foi desenvolvida utilizando HTML, CSS e JavaScript, permitindo acessar as páginas de produtos, clientes, vendas e relatórios.

**Camada de Controle (Negócios):**

Responsável por receber as solicitações dos usuários e executar as regras de negócio. Utiliza os Controllers e Services do Spring Boot para realizar operações como cadastro, consulta e registro de vendas.

**Camada de Modelo (Persistência):**

Responsável pela representação e armazenamento dos dados. Utiliza entidades Java, repositórios Spring Data JPA e o banco MySQL para armazenar clientes, produtos, vendas e itens das vendas.

Essa organização facilita a manutenção do sistema, separando a interface, as regras de negócio e o acesso ao banco de dados.

## 1.5. Benefícios esperados

Com a utilização do Sistema Pronta Entrega, a empresa poderá organizar melhor suas informações, reduzir erros nos registros de vendas, acompanhar o estoque e consultar indicadores administrativos.

Além disso, o controle de acesso permite separar as responsabilidades dos administradores e funcionários, contribuindo para a segurança das informações.
