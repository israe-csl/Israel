
document.addEventListener("DOMContentLoaded", () => {
    const abas = document.querySelectorAll(".aba");
    const secoes = document.querySelectorAll(".secao");
    const linksInternos = document.querySelectorAll("[data-ir]");
    const ano = document.getElementById("ano");

    // Alterna entre as seções
    function abrirSecao(id, atualizarEndereco = true) {
        const secaoDestino = document.getElementById(id);

        if (
            !secaoDestino ||
            !secaoDestino.classList.contains("secao")
        ) {
            return;
        }

        abas.forEach((aba) => {
            const selecionada = aba.dataset.secao === id;

            aba.classList.toggle("ativa", selecionada);
            aba.setAttribute("aria-selected", String(selecionada));
        });

        secoes.forEach((secao) => {
            secao.classList.toggle("ativa", secao.id === id);
        });

        if (atualizarEndereco) {
            history.replaceState(null, "", `#${id}`);
        }
    }

    
    abas.forEach((aba) => {
        aba.addEventListener("click", () => {
            abrirSecao(aba.dataset.secao);
        });
    });

  
    linksInternos.forEach((link) => {
        link.addEventListener("click", (evento) => {
            evento.preventDefault();
            abrirSecao(link.dataset.ir);
        });
    });

    
    if (ano) {
        ano.textContent = new Date().getFullYear();
    }

    // Abre a seção indicada no endereço, quando válida
    function carregarSecaoInicial() {
        const id = window.location.hash.slice(1);
        const secaoExiste = Array.from(secoes).some(
            (secao) => secao.id === id
        );

        abrirSecao(
            secaoExiste ? id : "biografia",
            false
        );
    }

    carregarSecaoInicial();

    window.addEventListener("hashchange", () => {
        const id = window.location.hash.slice(1);

        if (id) {
            abrirSecao(id, false);
        }
    });



    const botaoMenu = document.getElementById("menuMobile");
    const menu = document.getElementById("menu");

    if (botaoMenu && menu) {
        botaoMenu.addEventListener("click", () => {
            const aberto = menu.classList.toggle("aberto");

            botaoMenu.textContent = aberto ? "✕" : "☰";

            botaoMenu.setAttribute(
                "aria-expanded",
                String(aberto)
            );

            botaoMenu.setAttribute(
                "aria-label",
                aberto ? "Fechar menu" : "Abrir menu"
            );
        });

       
        abas.forEach((aba) => {
            aba.addEventListener("click", () => {
                menu.classList.remove("aberto");

                botaoMenu.textContent = "☰";

                botaoMenu.setAttribute(
                    "aria-expanded",
                    "false"
                );

                botaoMenu.setAttribute(
                    "aria-label",
                    "Abrir menu"
                );
            });
        });
    }

});
