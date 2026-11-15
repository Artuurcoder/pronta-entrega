const api = "/api/produtos";

const form = document.querySelector("#form-produto");
const lista = document.querySelector("#lista");
const mensagem = document.querySelector("#mensagem");
const campos = ["nome", "tipo", "tamanho", "preco", "quantidade"];

let produtos = [];

// Obter o token CSRF do navegador
function obterTokenCSRF() {
  const cookie = document.cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith("XSRF-TOKEN="));

  return cookie
    ? decodeURIComponent(cookie.substring("XSRF-TOKEN=".length))
    : "";
}

// Preparar cabeçalhos para operações protegidas
function cabecalhosSeguros(comJson = false) {
  const token = obterTokenCSRF();

  if (!token) {
    throw new Error("Token de segurança não encontrado. Atualize a página.");
  }

  const headers = {
    "X-XSRF-TOKEN": token,
  };

  if (comJson) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
}

// Mostrar mensagens
function avisar(texto, erro = false) {
  mensagem.textContent = texto;
  mensagem.className = erro ? "erro" : "sucesso";
}

// Limpar formulário
function limparFormulario() {
  form.reset();

  document.querySelector("#id").value = "";
  document.querySelector("#form-title").textContent = "Cadastrar produto";

  document.querySelector("#cancelar").hidden = true;
}

// Criar célula da tabela
function criarCelula(linha, texto) {
  const td = document.createElement("td");
  td.textContent = texto;
  linha.append(td);
  return td;
}

// Carregar produtos
async function carregar() {
  try {
    const busca = document.querySelector("#busca").value.trim();

    const url = api + (busca ? "?busca=" + encodeURIComponent(busca) : "");

    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error("Não foi possível consultar os produtos.");
    }

    produtos = await resposta.json();
    lista.replaceChildren();

    if (!produtos.length) {
      const linha = document.createElement("tr");

      criarCelula(linha, "Nenhum produto encontrado.").colSpan = 6;

      lista.append(linha);
      return;
    }

    for (const produto of produtos) {
      const linha = document.createElement("tr");

      criarCelula(linha, produto.nome);
      criarCelula(linha, produto.tipo);
      criarCelula(linha, produto.tamanho);

      criarCelula(
        linha,
        Number(produto.preco).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      );

      criarCelula(linha, produto.quantidade);

      const acoes = criarCelula(linha, "");

      // Botão editar
      const editar = document.createElement("button");
      editar.textContent = "Editar";
      editar.className = "tiny secondary";

      editar.addEventListener("click", () => {
        document.querySelector("#id").value = produto.id;

        for (const campo of campos) {
          document.getElementById(campo).value = produto[campo];
        }

        document.querySelector("#form-title").textContent = "Editar produto";

        document.querySelector("#cancelar").hidden = false;

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });

      // Botão excluir
      const excluir = document.createElement("button");
      excluir.textContent = "Excluir";
      excluir.className = "tiny danger";

      excluir.addEventListener("click", () => {
        excluirProduto(produto);
      });

      acoes.append(editar, excluir);
      lista.append(linha);
    }
  } catch (erro) {
    avisar(erro.message, true);
  }
}

// Excluir produto com proteção CSRF
async function excluirProduto(produto) {
  if (!confirm(`Excluir o produto ${produto.nome}?`)) {
    return;
  }

  try {
    const resposta = await fetch(`${api}/${produto.id}`, {
      method: "DELETE",
      headers: cabecalhosSeguros(),
    });

    if (!resposta.ok) {
      if (resposta.status === 403) {
        throw new Error(
          "Acesso negado. Verifique suas permissões ou o token de segurança.",
        );
      }

      throw new Error("Não foi possível excluir o produto.");
    }

    avisar("Produto excluído.");
    await carregar();
  } catch (erro) {
    avisar(erro.message, true);
  }
}

// Cadastrar ou editar produto
form.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const id = document.querySelector("#id").value;

  const dados = Object.fromEntries(
    campos.map((campo) => [campo, document.getElementById(campo).value]),
  );

  dados.preco = Number(dados.preco);
  dados.quantidade = Number(dados.quantidade);

  try {
    const resposta = await fetch(id ? `${api}/${id}` : api, {
      method: id ? "PUT" : "POST",
      headers: cabecalhosSeguros(true),
      body: JSON.stringify(dados),
    });

    if (!resposta.ok) {
      if (resposta.status === 403) {
        throw new Error(
          "Acesso negado. Verifique suas permissões ou o token de segurança.",
        );
      }

      const body = await resposta.json().catch(() => ({}));

      throw new Error(body.erro || "Não foi possível salvar o produto.");
    }

    limparFormulario();
    avisar("Produto salvo com sucesso.");

    await carregar();
  } catch (erro) {
    avisar(erro.message, true);
  }
});

// Cancelar edição
document.querySelector("#cancelar").addEventListener("click", limparFormulario);

// Pesquisar produtos
document.querySelector("#busca").addEventListener("input", carregar);

// Carregar os produtos ao abrir a página
carregar();
