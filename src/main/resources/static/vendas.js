const API_VENDAS = "/api/vendas";
const API_CLIENTES = "/api/clientes";
const API_PRODUTOS = "/api/produtos";

// Obter o token CSRF armazenado no navegador
function obterTokenCSRF() {
  const cookies = document.cookie.split(";");

  const cookieCSRF = cookies.find((cookie) =>
    cookie.trim().startsWith("XSRF-TOKEN="),
  );

  return cookieCSRF
    ? decodeURIComponent(cookieCSRF.trim().substring("XSRF-TOKEN=".length))
    : "";
}

const form = document.getElementById("formVenda");
const campoCliente = document.getElementById("cliente");
const campoProduto = document.getElementById("produto");
const campoQuantidade = document.getElementById("quantidade");
const campoEstoque = document.getElementById("estoqueDisponivel");
const campoTotal = document.getElementById("totalVenda");
const tabelaItens = document.getElementById("itensVenda");
const listaVendas = document.getElementById("listaVendas");
const mensagem = document.getElementById("mensagem");
const botaoAdicionar = document.getElementById("adicionarProduto");
const botaoConfirmar = form.querySelector('button[type="submit"]');

let produtos = [];
let itens = [];

// Formatar valores em reais
function formatarMoeda(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

// Mostrar mensagens
function mostrarMensagem(texto, erro = false) {
  mensagem.textContent = texto;
  mensagem.style.color = erro ? "#c0392b" : "green";
}

// Consultar API
async function consultarAPI(url) {
  const resposta = await fetch(url);

  if (!resposta.ok) {
    throw new Error("Erro ao consultar " + url);
  }

  return resposta.json();
}

// Carregar os clientes
async function carregarClientes() {
  const clientes = await consultarAPI(API_CLIENTES);

  campoCliente.innerHTML = '<option value="">Selecione o cliente</option>';

  clientes.forEach((cliente) => {
    const opcao = document.createElement("option");
    opcao.value = cliente.id;
    opcao.textContent = cliente.nome;
    campoCliente.appendChild(opcao);
  });
}

// Carregar os produtos disponíveis
async function carregarProdutos() {
  produtos = await consultarAPI(API_PRODUTOS);

  campoProduto.innerHTML = '<option value="">Selecione o produto</option>';

  produtos.forEach((produto) => {
    const opcao = document.createElement("option");

    opcao.value = produto.id;
    opcao.textContent = `${produto.nome} - ${formatarMoeda(produto.preco)}`;

    campoProduto.appendChild(opcao);
  });

  mostrarEstoque();
}

// Mostrar estoque disponível
function mostrarEstoque() {
  const produto = produtos.find((p) => p.id === Number(campoProduto.value));

  campoEstoque.textContent = produto
    ? `Estoque disponível: ${produto.quantidade} unidades`
    : "";
}

// Atualizar carrinho e total
function atualizarCarrinho() {
  tabelaItens.innerHTML = "";

  if (itens.length === 0) {
    const linha = tabelaItens.insertRow();
    const celula = linha.insertCell();

    celula.colSpan = 5;
    celula.textContent = "Nenhum produto adicionado.";

    campoTotal.textContent = formatarMoeda(0);
    return;
  }

  let total = 0;

  itens.forEach((item) => {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;

    const linha = tabelaItens.insertRow();

    [
      item.nome,
      item.quantidade,
      formatarMoeda(item.preco),
      formatarMoeda(subtotal),
    ].forEach((valor) => {
      const celula = linha.insertCell();
      celula.textContent = valor;
    });

    const celulaAcoes = linha.insertCell();
    const botaoRemover = document.createElement("button");

    botaoRemover.type = "button";
    botaoRemover.textContent = "Remover";
    botaoRemover.className = "remover";

    botaoRemover.addEventListener("click", () => {
      itens = itens.filter((i) => i.produtoId !== item.produtoId);

      atualizarCarrinho();
    });

    celulaAcoes.appendChild(botaoRemover);
  });

  campoTotal.textContent = formatarMoeda(total);
}

// Adicionar produto à venda
botaoAdicionar.addEventListener("click", () => {
  const produtoId = Number(campoProduto.value);
  const quantidade = Number(campoQuantidade.value);

  const produto = produtos.find((p) => p.id === produtoId);

  if (!produto) {
    mostrarMensagem("Selecione um produto.", true);
    return;
  }

  if (!Number.isInteger(quantidade) || quantidade <= 0) {
    mostrarMensagem("Informe uma quantidade válida.", true);
    return;
  }

  const itemExistente = itens.find((item) => item.produtoId === produtoId);

  const quantidadeTotal =
    quantidade + (itemExistente ? itemExistente.quantidade : 0);

  if (quantidadeTotal > produto.quantidade) {
    mostrarMensagem("Estoque insuficiente!", true);
    return;
  }

  if (itemExistente) {
    itemExistente.quantidade = quantidadeTotal;
  } else {
    itens.push({
      produtoId: produto.id,
      nome: produto.nome,
      preco: Number(produto.preco),
      quantidade: quantidade,
    });
  }

  mostrarMensagem("Produto adicionado à venda.");

  atualizarCarrinho();

  campoProduto.value = "";
  campoQuantidade.value = 1;

  mostrarEstoque();
});

// Listar vendas realizadas
async function carregarVendas() {
  const vendas = await consultarAPI(API_VENDAS);

  listaVendas.innerHTML = "";

  if (vendas.length === 0) {
    const linha = listaVendas.insertRow();
    const celula = linha.insertCell();

    celula.colSpan = 4;
    celula.textContent = "Nenhuma venda registrada.";

    return;
  }

  vendas.forEach((venda) => {
    const linha = listaVendas.insertRow();

    const data = new Date(venda.dataVenda);

    [
      venda.id,
      venda.clienteNome,
      data.toLocaleString("pt-BR"),
      formatarMoeda(venda.valorTotal),
    ].forEach((valor) => {
      const celula = linha.insertCell();
      celula.textContent = valor;
    });
  });
}

// Confirmar venda
form.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const clienteId = Number(campoCliente.value);

  if (!clienteId) {
    mostrarMensagem("Selecione um cliente.", true);
    return;
  }

  if (itens.length === 0) {
    mostrarMensagem("Adicione pelo menos um produto.", true);
    return;
  }

  const dados = {
    clienteId: clienteId,
    produtos: itens.map((item) => ({
      produtoId: item.produtoId,
      quantidade: item.quantidade,
    })),
  };

  botaoConfirmar.disabled = true;

  try {
    const tokenCSRF = obterTokenCSRF();

    if (!tokenCSRF) {
      throw new Error(
        "Token de segurança não encontrado. Atualize a página e tente novamente.",
      );
    }

    const resposta = await fetch(API_VENDAS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": tokenCSRF,
      },
      body: JSON.stringify(dados),
    });

    if (!resposta.ok) {
      const detalhe = await resposta.text();

      throw new Error(
        `Erro ao registrar venda (${resposta.status}). ${detalhe}`,
      );
    }

    const venda = await resposta.json();

    itens = [];
    form.reset();

    atualizarCarrinho();

    mostrarMensagem(`Venda nº ${venda.id} registrada com sucesso!`);

    await carregarProdutos();
    await carregarVendas();
  } catch (erro) {
    mostrarMensagem(erro.message, true);
  } finally {
    botaoConfirmar.disabled = false;
  }
});

// Atualizar estoque ao selecionar produto
campoProduto.addEventListener("change", mostrarEstoque);

// Carregar os dados iniciais
async function iniciar() {
  try {
    await carregarClientes();
    await carregarProdutos();
    await carregarVendas();

    atualizarCarrinho();
  } catch (erro) {
    mostrarMensagem(erro.message, true);
  }
}

iniciar();
