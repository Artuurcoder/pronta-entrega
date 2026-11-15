const API_CLIENTES = "/api/clientes";

const form = document.getElementById("formCliente");
const lista = document.getElementById("listaClientes");
const mensagem = document.getElementById("mensagem");

const botaoSalvar = form.querySelector('button[type="submit"]');

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
function mostrarMensagem(texto, erro = false) {
  mensagem.textContent = texto;
  mensagem.style.color = erro ? "#c0392b" : "green";
}

// Mostrar erros das requisições
async function verificarResposta(resposta, operacao) {
  if (resposta.ok) {
    return;
  }

  if (resposta.status === 403) {
    throw new Error(
      "Acesso negado. Verifique suas permissões ou o token CSRF.",
    );
  }

  if (resposta.status === 401) {
    throw new Error("Sua sessão não está autenticada. Entre novamente.");
  }

  throw new Error(
    `Não foi possível ${operacao}. Erro HTTP ${resposta.status}.`,
  );
}

// Carregar clientes cadastrados
async function carregarClientes() {
  try {
    const resposta = await fetch(API_CLIENTES);

    await verificarResposta(resposta, "consultar clientes");

    const clientes = await resposta.json();

    lista.replaceChildren();

    if (clientes.length === 0) {
      const linha = lista.insertRow();
      const celula = linha.insertCell();

      celula.colSpan = 5;
      celula.textContent = "Nenhum cliente cadastrado.";

      return;
    }

    clientes.forEach((cliente) => {
      const linha = lista.insertRow();

      [
        cliente.nome,
        cliente.cpfCnpj,
        cliente.telefone,
        cliente.endereco,
      ].forEach((valor) => {
        const celula = linha.insertCell();
        celula.textContent = valor ?? "";
      });

      const acoes = linha.insertCell();

      // Botão editar
      const editar = document.createElement("button");

      editar.textContent = "Editar";
      editar.type = "button";

      editar.addEventListener("click", () => {
        editarCliente(cliente);
      });

      // Botão excluir
      const excluir = document.createElement("button");

      excluir.textContent = "Excluir";
      excluir.type = "button";
      excluir.style.background = "#c0392b";
      excluir.style.marginLeft = "5px";

      excluir.addEventListener("click", () => {
        excluirCliente(cliente.id);
      });

      acoes.append(editar, excluir);
    });
  } catch (erro) {
    mostrarMensagem(erro.message, true);
  }
}

// Cadastrar ou atualizar cliente
form.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const id = document.getElementById("clienteId").value;

  const cliente = {
    nome: document.getElementById("nome").value.trim(),
    cpfCnpj: document.getElementById("cpfCnpj").value.trim(),
    telefone: document.getElementById("telefone").value.trim(),
    endereco: document.getElementById("endereco").value.trim(),
  };

  const url = id ? `${API_CLIENTES}/${id}` : API_CLIENTES;

  const metodo = id ? "PUT" : "POST";

  botaoSalvar.disabled = true;

  try {
    const resposta = await fetch(url, {
      method: metodo,
      headers: cabecalhosSeguros(true),
      body: JSON.stringify(cliente),
    });

    await verificarResposta(resposta, "salvar o cliente");

    form.reset();

    document.getElementById("clienteId").value = "";

    mostrarMensagem(
      id
        ? "Cliente atualizado com sucesso!"
        : "Cliente cadastrado com sucesso!",
    );

    await carregarClientes();
  } catch (erro) {
    mostrarMensagem(erro.message, true);
  } finally {
    botaoSalvar.disabled = false;
  }
});

// Preencher formulário para edição
function editarCliente(cliente) {
  document.getElementById("clienteId").value = cliente.id;

  document.getElementById("nome").value = cliente.nome ?? "";

  document.getElementById("cpfCnpj").value = cliente.cpfCnpj ?? "";

  document.getElementById("telefone").value = cliente.telefone ?? "";

  document.getElementById("endereco").value = cliente.endereco ?? "";

  mostrarMensagem("Altere os dados e clique em Salvar cliente.");

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Excluir cliente
async function excluirCliente(id) {
  if (!confirm("Deseja realmente excluir este cliente?")) {
    return;
  }

  try {
    const resposta = await fetch(`${API_CLIENTES}/${id}`, {
      method: "DELETE",
      headers: cabecalhosSeguros(),
    });

    await verificarResposta(resposta, "excluir o cliente");

    mostrarMensagem("Cliente excluído com sucesso!");

    await carregarClientes();
  } catch (erro) {
    mostrarMensagem(erro.message, true);
  }
}

// Carregar clientes ao abrir a página
carregarClientes();
