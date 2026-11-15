const API_RELATORIOS = "/api/relatorios/resumo";

const campoFaturamento = document.getElementById("faturamento");
const campoTotalVendas = document.getElementById("totalVendas");
const campoProdutos = document.getElementById("produtosCadastrados");
const campoEstoque = document.getElementById("estoqueDisponivel");
const mensagem = document.getElementById("mensagem");

// Formatar valores em reais
function formatarMoeda(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

// Consultar os relatórios
async function carregarRelatorios() {
  try {
    mensagem.textContent = "Carregando relatórios...";
    mensagem.style.color = "#64748b";

    const resposta = await fetch(API_RELATORIOS, {
      method: "GET",
      credentials: "same-origin",
      cache: "no-store",
    });

    if (resposta.status === 403) {
      throw new Error(
        "Acesso negado. Apenas o administrador pode consultar os relatórios.",
      );
    }

    if (resposta.status === 401 || resposta.redirected) {
      throw new Error("Sua sessão expirou. Faça login novamente.");
    }

    if (!resposta.ok) {
      throw new Error(`Erro ao consultar relatórios. HTTP ${resposta.status}.`);
    }

    const dados = await resposta.json();

    campoFaturamento.textContent = formatarMoeda(dados.faturamentoTotal);

    campoTotalVendas.textContent = dados.totalVendas ?? 0;

    campoProdutos.textContent = dados.produtosCadastrados ?? 0;

    campoEstoque.textContent = dados.estoqueDisponivel ?? 0;

    mensagem.textContent = "Relatórios atualizados com sucesso!";
    mensagem.style.color = "green";
  } catch (erro) {
    mensagem.textContent = erro.message;
    mensagem.style.color = "#c0392b";
  }
}

// Carregar os dados ao abrir a página
carregarRelatorios();
