# 2. Proposta de Desenvolvimento do Sistema

## 2.1. Apresentação da proposta

O Sistema Pronta Entrega foi desenvolvido para auxiliar no gerenciamento de uma empresa fictícia que comercializa roupas no atacado.

A proposta consiste em disponibilizar uma aplicação web que permita cadastrar produtos e clientes, registrar vendas, controlar o estoque e consultar relatórios administrativos.

Para facilitar a organização e a manutenção do sistema, foi utilizada uma arquitetura em três camadas, com separação entre aplicação, regras de negócio e persistência de dados.

## 2.2. Camada de Aplicação

A camada de aplicação é responsável pela comunicação com o usuário, permitindo acessar as funcionalidades por meio de um navegador.

A interface foi desenvolvida utilizando HTML5, CSS3 e JavaScript.

As principais páginas são:

- **index.html:** cadastro, consulta e gerenciamento de produtos.
- **clientes.html:** cadastro, consulta, edição e exclusão de clientes.
- **vendas.html:** registro e consulta das vendas.
- **relatorios.html:** apresentação dos indicadores administrativos.
- **login.html:** autenticação dos usuários.

O JavaScript utiliza requisições HTTP para enviar e receber informações da API REST desenvolvida com Spring Boot.

## 2.3. Camada de Negócios

A camada de negócios é responsável por processar as solicitações recebidas e executar as regras necessárias ao funcionamento do sistema.

Foi implementada utilizando Java e Spring Boot.

As principais classes de serviço são:

- **ProdutoService:** responsável pelas operações relacionadas aos produtos.
- **ClienteService:** responsável pelas operações relacionadas aos clientes.
- **VendaService:** responsável pelo registro das vendas e atualização das quantidades em estoque.

O sistema também utiliza Controllers REST para receber as requisições HTTP e encaminhar as operações aos serviços correspondentes.

O Spring Security é utilizado para autenticação e controle de acesso, diferenciando administradores e funcionários.

## 2.4. Camada de Persistência

A camada de persistência é responsável pelo armazenamento e pela recuperação dos dados.

Foi utilizado o banco de dados relacional MySQL 8, integrado à aplicação por meio do Spring Data JPA e Hibernate.

As principais entidades são:

- **Produto:** representa os produtos comercializados pela loja.
- **Cliente:** armazena as informações dos clientes.
- **Venda:** representa cada venda realizada.
- **ItemVenda:** representa os produtos e quantidades associados a uma venda.

Os repositórios Java realizam a comunicação entre a aplicação e o banco de dados.

## 2.5. Funcionamento da arquitetura

O funcionamento do sistema segue uma sequência organizada.

Primeiro, o usuário realiza uma operação na interface, como cadastrar um produto ou registrar uma venda.

O JavaScript envia uma requisição HTTP para a API REST.

O Controller recebe a solicitação e encaminha o processamento à camada de negócios.

O Service executa as regras necessárias e utiliza os repositórios para consultar ou atualizar os dados no MySQL.

Por fim, a aplicação retorna uma resposta ao navegador, apresentando o resultado da operação ao usuário.

## 2.6. Benefícios da arquitetura

A separação em camadas facilita a organização do código, a manutenção e a evolução do sistema.

Também permite modificar a interface sem alterar diretamente a lógica de negócio, além de organizar as operações de acesso ao banco de dados.

Dessa forma, o Sistema Pronta Entrega aplica conceitos fundamentais do desenvolvimento de sistemas corporativos utilizando Java, Spring Boot e arquitetura em três camadas.
