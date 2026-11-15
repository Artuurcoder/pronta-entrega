# Sistema Pronta Entrega

Projeto acadêmico desenvolvido para a disciplina **Desenvolvimento de Sistemas Corporativos**, da Universidade do Estado do Rio Grande do Norte (UERN).

## 1. Descrição

O Pronta Entrega é um sistema web para gerenciamento de uma loja fictícia de roupas que realiza vendas no atacado.

O sistema permite cadastrar produtos, gerenciar clientes, registrar vendas, controlar o estoque e consultar relatórios administrativos.

## 2. Tecnologias utilizadas

- Java 17
- Spring Boot 3
- Spring Security
- Spring Data JPA
- Hibernate
- MySQL 8
- Maven
- Apache Tomcat incorporado ao Spring Boot
- HTML5
- CSS3
- JavaScript
- Git e GitHub

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

Usuário: `admin`

Pode gerenciar produtos, clientes e vendas, além de consultar relatórios administrativos.

### Funcionário

Usuário: `funcionario`

Pode consultar produtos e registrar vendas, mas não pode modificar o cadastro de produtos nem acessar relatórios administrativos.

**Observação:** as senhas dos usuários são configuradas por variáveis de ambiente e não estão incluídas no repositório.

## 5. Banco de dados

Banco de dados utilizado: **MySQL 8**.

Nome do banco: `pronta_entrega`

Tabelas principais:

- `produtos`
- `clientes`
- `vendas`
- `itens_venda`

O sistema utiliza Spring Data JPA e Hibernate para persistência e gerenciamento das entidades.

## 6. Requisitos para execução

Para executar o projeto, é necessário instalar:

- JDK 17
- Maven
- MySQL 8
- Git (para clonar o repositório)

É necessário também que o servidor MySQL esteja em execução.

## 7. Como baixar o projeto

Abra um terminal e execute:

```bash
git clone https://github.com/Artuurcoder/pronta-entrega.git
```

Acesse a pasta do projeto:

```bash
cd pronta-entrega
```

**Observação:** enquanto o repositório estiver privado, será necessário ter acesso autorizado para realizar o clone.

## 8. Configuração do banco de dados

Acesse o MySQL e execute:

```sql
CREATE DATABASE IF NOT EXISTS pronta_entrega
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

A aplicação está configurada para acessar:

- Servidor: `127.0.0.1`
- Porta: `3306`
- Banco: `pronta_entrega`
- Usuário: `root`

A senha do banco de dados deve ser configurada pela variável de ambiente `DB_PASSWORD`.

O Hibernate está configurado com `spring.jpa.hibernate.ddl-auto=update`, permitindo criar ou atualizar as tabelas de acordo com as entidades Java.

## 9. Configuração das variáveis de ambiente

Antes de executar o sistema, configure três variáveis:

- `DB_PASSWORD`: senha do usuário MySQL.
- `ADMIN_PASSWORD`: senha de acesso do administrador.
- `FUNCIONARIO_PASSWORD`: senha de acesso do funcionário.

### Exemplo no Windows PowerShell

Na janela do PowerShell em que o sistema será executado, utilize:

```powershell
$senhaBanco = Read-Host "Senha do MySQL" -AsSecureString
$env:DB_PASSWORD = [System.Net.NetworkCredential]::new("", $senhaBanco).Password

$senhaAdmin = Read-Host "Senha do administrador" -AsSecureString
$env:ADMIN_PASSWORD = [System.Net.NetworkCredential]::new("", $senhaAdmin).Password

$senhaFuncionario = Read-Host "Senha do funcionario" -AsSecureString
$env:FUNCIONARIO_PASSWORD = [System.Net.NetworkCredential]::new("", $senhaFuncionario).Password
```

As variáveis ficam disponíveis na sessão atual do PowerShell.

**Por segurança, não inclua senhas reais no código-fonte, no README ou nos commits do GitHub.**

## 10. Execução do sistema

Com o MySQL em execução e as variáveis de ambiente configuradas, abra o terminal na pasta principal do projeto.

Execute:

```bash
mvn spring-boot:run
```

Após a inicialização, acesse no navegador:

http://localhost:8080/login.html

Entre com um dos usuários configurados e sua respectiva senha.

Para encerrar a aplicação, pressione `Ctrl + C` no terminal.

## 11. Páginas do sistema

- Login: `/login.html`
- Produtos: `/`
- Clientes: `/clientes.html`
- Vendas: `/vendas.html`
- Relatórios: `/relatorios.html`

O acesso às páginas e funcionalidades depende das permissões do usuário autenticado.

## 12. Arquitetura do sistema

O projeto utiliza uma arquitetura em camadas, baseada nos conceitos MVC:

**Camada de Aplicação:** interface desenvolvida em HTML, CSS e JavaScript.

**Camada de Negócios:** Controllers REST e Services responsáveis pelo processamento das requisições e regras do sistema.

**Camada de Persistência:** entidades Java, repositórios Spring Data JPA, Hibernate e banco de dados MySQL.

Essa separação facilita a organização, a manutenção e a evolução do software.

## 13. Documentação acadêmica

A documentação complementar está disponível na pasta `docs`:

- [Etapa 1 — Cenário da Empresa Fictícia](docs/01-cenario-empresa.md)
- [Etapa 2 — Proposta de Desenvolvimento](docs/02-proposta-desenvolvimento.md)
- [Etapa 3 — Transações e Casos de Uso](docs/03-transacoes-casos-de-uso.md)

Esses documentos apresentam o cenário da empresa, a organização da arquitetura e a modelagem das transações empresariais.

## 14. Objetivo acadêmico

Aplicar os conceitos estudados na disciplina Desenvolvimento de Sistemas Corporativos, incluindo:

- Desenvolvimento web com Java e Spring Boot
- Arquitetura em três camadas
- API REST
- Persistência em banco de dados relacional
- Autenticação e autorização
- Implementação de transações empresariais
- Consultas e relatórios
- Versionamento e documentação com GitHub

O projeto foi desenvolvido com finalidade acadêmica, utilizando como estudo de caso uma empresa fictícia de comércio atacadista de roupas.
