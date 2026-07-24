/* =========================================================
   PORTFÓLIO — JULIO BASTOS
   script.js
   ========================================================= */


/* =========================================================
   1) LISTA DE PROJETOS
   =========================================================
   Esta é a ÚNICA parte do código que você precisa editar
   para adicionar, remover ou alterar um projeto do portfólio.
   O HTML e o CSS não precisam ser tocados.

   COMO ADICIONAR UM NOVO PROJETO (ex: o 3º ou 4º):

   1. Copie um dos objetos abaixo (do { até o }).
   2. Cole logo após o último objeto da lista, separando com uma vírgula.
   3. Preencha cada campo com as informações do seu novo projeto:

      - titulo:      Nome do projeto (texto)
      - descricao:   Um resumo curto do que o projeto faz (texto)
      - tecnologias: Lista das tecnologias usadas, entre colchetes,
                      cada uma entre aspas e separada por vírgula.
                      Ex: ["Python", "Flask", "SQLite"]
      - linkGithub:  URL do repositório no GitHub (texto)
      - linkDemo:    URL do site/demo publicado (texto).
                      Se ainda não tiver um demo, pode deixar "#"
                      ou remover o botão manualmente no HTML gerado.

   4. Salve o arquivo. O card novo aparece automaticamente na tela,
      pois a função renderizarProjetos() lê essa lista e monta o
      HTML sozinha — não é preciso escrever nenhum card manualmente.
   ========================================================= */

const meusProjetos = [
  {
    titulo: "LinkTree",
    descricao: "Chama a atenção para o seu perfil com um hub de links personalizado, estilo LinkTree, feito com HTML, CSS e JavaScript.",
    tecnologias: ["HTML5", "CSS3", "JavaScript"],
    linkGithub: "https://github.com/JBastosss/linktree",
    linkDemo: "https://jblinktree.netlify.app/"
  },
  {
    titulo: "API de Biblioteca",
    descricao: "API REST em Python para cadastro e consulta de livros, autores e empréstimos, com persistência em banco de dados.",
    tecnologias: ["Python", "SQLite", "Git"],
    linkGithub: "https://github.com/seu-usuario/api-biblioteca",
    linkDemo: "#"
  }

  /* 
  Exemplo de como ficaria um 3º projeto — basta descomentar
  e preencher com os dados reais:

  ,{
    titulo: "Nome do Projeto",
    descricao: "Descrição breve do que o projeto resolve.",
    tecnologias: ["Java", "MySQL"],
    linkGithub: "https://github.com/seu-usuario/novo-projeto",
    linkDemo: "https://link-do-demo.com"
  }
  */
];


/* =========================================================
   2) RENDERIZAÇÃO DOS CARDS DE PROJETO
   ========================================================= */

function renderizarProjetos() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  // Monta o HTML de todos os cards a partir do array meusProjetos
  // e insere tudo de uma vez no container (mais performático que
  // inserir um por um dentro do loop).
  const cardsHtml = meusProjetos.map((projeto) => {

    // Transforma o array de tecnologias em várias <span class="tag">
    const tagsHtml = projeto.tecnologias
      .map((tecnologia) => `<span class="tag">${tecnologia}</span>`)
      .join("");

    return `
      <article class="project-card">
        <h3 class="project-card__title">${projeto.titulo}</h3>
        <p class="project-card__desc">${projeto.descricao}</p>
        <div class="project-card__tags">${tagsHtml}</div>
        <div class="project-card__actions">
          <a href="${projeto.linkGithub}" target="_blank" rel="noopener noreferrer" class="btn btn--ghost btn--small">
            Ver Código (GitHub)
          </a>
          <a href="${projeto.linkDemo}" target="_blank" rel="noopener noreferrer" class="btn btn--primary btn--small">
            Testar / Demo
          </a>
        </div>
      </article>
    `;
  }).join("");

  grid.innerHTML = cardsHtml;
}


/* =========================================================
   3) MENU MOBILE (abrir/fechar)
   ========================================================= */

function iniciarMenuMobile() {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const aberto = menu.classList.toggle("open");
    toggle.classList.toggle("open", aberto);
    toggle.setAttribute("aria-expanded", String(aberto));
  });

  // Fecha o menu automaticamente ao clicar em um link (mobile)
  menu.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}


/* =========================================================
   4) LINK ATIVO NO MENU CONFORME A ROLAGEM (scrollspy)
   ========================================================= */

function iniciarScrollSpy() {
  const secoes = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav-link");
  if (!secoes.length || !links.length) return;

  const observer = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          const id = entrada.target.getAttribute("id");

          links.forEach((link) => {
            const correspondeAoId = link.getAttribute("href") === `#${id}`;
            link.classList.toggle("active", correspondeAoId);
          });
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  secoes.forEach((secao) => observer.observe(secao));
}


/* =========================================================
   5) ANO ATUAL NO RODAPÉ
   ========================================================= */

function iniciarAnoRodape() {
  const spanAno = document.getElementById("anoAtual");
  if (spanAno) {
    spanAno.textContent = new Date().getFullYear();
  }
}


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  renderizarProjetos();
  iniciarMenuMobile();
  iniciarScrollSpy();
  iniciarAnoRodape();
});