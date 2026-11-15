# 3. Transações da Empresa e Modelagem do Sistema

## 3.1. Principais transações da empresa

A empresa fictícia Pronta Entrega realiza atividades relacionadas ao comércio atacadista de roupas.

Para organizar essas operações, o sistema disponibiliza as seguintes funcionalidades:

**1. Cadastro de produtos**

O administrador pode cadastrar novos produtos, informando nome, tipo, tamanho, preço e quantidade disponível. Também pode editar ou excluir produtos.

**2. Cadastro de clientes**

O administrador pode cadastrar clientes, informando nome, CPF/CNPJ, telefone e endereço. O sistema permite consultar, atualizar e excluir esses registros.

**3. Registro de vendas**

O administrador e o funcionário podem registrar vendas, selecionando um cliente e adicionando um ou mais produtos com suas respectivas quantidades.

O sistema calcula o valor total e atualiza o estoque após a confirmação da venda.

**4. Consulta de produtos e estoque**

Os usuários autenticados podem consultar os produtos cadastrados, seus preços e as quantidades disponíveis.

**5. Consulta de relatórios**

O administrador pode acessar relatórios que apresentam informações sobre faturamento bruto, quantidade de vendas, produtos cadastrados e unidades disponíveis em estoque.

## 3.2. Identificação dos atores

O sistema possui dois tipos de usuários:

- **Administrador:** responsável pelo gerenciamento de produtos, clientes, vendas e relatórios.
- **Funcionário:** responsável pela consulta de produtos e pelo registro de vendas.

As permissões são controladas pelo Spring Security.

## 3.3. Caso de uso UC01 — Registrar Venda

**Nome:** Registrar Venda

**Ator principal:** Administrador ou Funcionário.

**Objetivo:** Registrar uma venda de roupas, calcular seu valor total e atualizar o estoque.

**Pré-condições:**

- O usuário deve estar autenticado.
- O cliente deve estar cadastrado.
- Os produtos devem estar cadastrados.
- Deve existir estoque suficiente.

### Fluxo principal

1. O usuário acessa a página de vendas.
2. O sistema apresenta os clientes e produtos disponíveis.
3. O usuário seleciona o cliente.
4. O usuário escolhe um produto e informa a quantidade desejada.
5. O sistema verifica a quantidade disponível em estoque.
6. O usuário adiciona o produto ao carrinho.
7. O usuário pode adicionar outros produtos à mesma venda.
8. O sistema calcula o subtotal de cada produto e o valor total.
9. O usuário confirma a venda.
10. O sistema registra a venda e seus itens no banco de dados.
11. O sistema atualiza as quantidades dos produtos em estoque.
12. O sistema apresenta uma mensagem confirmando a venda.

### Fluxos alternativos

**A1 — Produto sem estoque suficiente**

Se a quantidade solicitada for maior que o estoque disponível, o sistema informa que o estoque é insuficiente e impede a adição daquela quantidade ao carrinho.

**A2 — Cliente não selecionado**

Se o usuário tentar confirmar a venda sem selecionar um cliente, o sistema apresenta uma mensagem solicitando essa informação.

**A3 — Venda sem produtos**

Se o usuário tentar confirmar uma venda com o carrinho vazio, o sistema informa que é necessário adicionar pelo menos um produto.

**A4 — Falha no registro da venda**

Se ocorrer um erro durante o processamento, o sistema informa que não foi possível registrar a venda.

### Pós-condições

Após uma operação bem-sucedida:

- A venda fica registrada no banco de dados.
- Os produtos vendidos ficam associados à venda.
- O valor total é armazenado.
- O estoque é atualizado.
- A venda pode ser consultada posteriormente.

## 3.4. Exemplo prático

Durante os testes do Sistema Pronta Entrega, foi registrada uma venda para a cliente Emily.

O produto selecionado foi uma camiseta básica, com quantidade de uma unidade e preço de R$ 50,00.

Após a confirmação, a venda nº 4 foi registrada no banco de dados MySQL e o estoque da camiseta foi atualizado de 13 para 12 unidades.

Esse teste demonstrou o funcionamento da transação de registro de venda e sua integração com a persistência de dados.

## 3.5. Modelagem dos dados

O sistema utiliza quatro entidades principais:

**Cliente:** representa a pessoa ou empresa que realiza compras.

**Produto:** representa as roupas disponíveis para comercialização.

**Venda:** armazena as informações gerais da operação, incluindo cliente, data e valor total.

**ItemVenda:** registra os produtos, as quantidades, os preços unitários e os subtotais de cada venda.

### Relacionamentos

- Um cliente pode possuir várias vendas.
- Cada venda pertence a um cliente.
- Uma venda pode possuir vários itens.
- Cada item está associado a um produto.
- Um produto pode aparecer em diferentes vendas.

Essa estrutura permite armazenar os registros das vendas de maneira organizada e consultar posteriormente as informações necessárias.

## 3.6. Considerações finais

A modelagem das transações permite compreender como os usuários interagem com o Sistema Pronta Entrega.

O caso de uso de registro de vendas demonstra a integração entre a interface, as regras de negócio e a persistência de dados, aplicando conceitos de desenvolvimento de sistemas corporativos.
