async function carregarMenu() {
  const menu = document.createElement("nav");
  menu.id = "menu-principal";

  Object.assign(menu.style, {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "12px",
    padding: "15px 25px",
    marginBottom: "25px",
    background: "#172033",
    borderRadius: "8px",
  });

  function adicionarLink(texto, destino) {
    const link = document.createElement("a");
    link.href = destino;
    link.textContent = texto;

    Object.assign(link.style, {
      color: "white",
      textDecoration: "none",
      fontSize: "14px",
      padding: "8px 12px",
    });

    menu.appendChild(link);
  }

  // Consultar informações do usuário autenticado
  let administrador = false;

  try {
    const resposta = await fetch("/api/usuario", {
      credentials: "same-origin",
    });

    if (resposta.ok) {
      const usuario = await resposta.json();
      administrador = usuario.roles.includes("ROLE_ADMIN");
    }
  } catch (erro) {
    console.error("Erro ao consultar usuário:", erro);
  }

  adicionarLink("Produtos", "/");

  if (administrador) {
    adicionarLink("Clientes", "/clientes.html");
  }

  adicionarLink("Vendas", "/vendas.html");

  if (administrador) {
    adicionarLink("Relatórios", "/relatorios.html");
  }

  // Botão de logout

  // Botão de logout seguro
  const sair = document.createElement("button");
  sair.type = "button";
  sair.textContent = "Sair";

  Object.assign(sair.style, {
    marginLeft: "auto",
    color: "#ffffff",
    background: "#c0392b",
    padding: "8px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  });

  sair.addEventListener("click", async () => {
    const cookie = document.cookie
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith("XSRF-TOKEN="));

    if (!cookie) {
      alert("Token de segurança não encontrado. Atualize a página.");
      return;
    }

    const token = decodeURIComponent(cookie.substring("XSRF-TOKEN=".length));

    sair.disabled = true;

    try {
      const resposta = await fetch("/logout", {
        method: "POST",
        headers: {
          "X-XSRF-TOKEN": token,
        },
        credentials: "same-origin",
        redirect: "manual",
      });

      if (resposta.status >= 400) {
        throw new Error("Falha ao encerrar a sessão.");
      }

      window.location.assign("/login.html?logout");
    } catch (erro) {
      alert(erro.message);
      sair.disabled = false;
    }
  });

  menu.appendChild(sair);

  document.body.prepend(menu);
}

carregarMenu();
