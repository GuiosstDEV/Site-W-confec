let antButton = document.getElementById("ant");
let proxButton = document.getElementById("prox");
let container = document.querySelector(".container");
let items = container.querySelectorAll(".list .item");
let indicador = document.querySelector(".indicador");
let pontos = indicador.querySelectorAll("ul li");
let list = container.querySelector(".list");

let ativo = 0;
let animando = false;

items.forEach((item, index) => {
    if (index !== ativo) {
        item.classList.add("fora");
    }
});

function trocarItem(direcao) {
    if (animando) return;

    animando = true;
    let itemAnterior = items[ativo];
    let indiceNovo = (ativo + direcao + items.length) % items.length;
    let pontoNovo = Math.floor(indiceNovo * pontos.length / items.length);
    let itemNovo = items[indiceNovo];
    let classeSaida = direcao > 0 ? "saindo-esquerda" : "saindo-direita";
    let classeEntrada = direcao > 0 ? "entrando-direita" : "entrando-esquerda";

    list.style.setProperty("--calcular", direcao > 0 ? -1 : 1);
    itemAnterior.classList.remove("ativo");
    itemAnterior.classList.add(classeSaida);
    itemNovo.classList.remove("fora");
    itemNovo.classList.add(classeEntrada);

    void itemNovo.offsetWidth;
    requestAnimationFrame(() => {
        itemNovo.classList.remove(classeEntrada);
        itemNovo.classList.add("ativo");
    });

    indicador.querySelector("ul li.ativo").classList.remove("ativo");
    pontos[pontoNovo].classList.add("ativo");
    ativo = indiceNovo;
    indicador.querySelector(".numero").textContent = String(ativo + 1).padStart(2, "0");

    setTimeout(() => {
        itemAnterior.classList.remove(classeSaida);
        itemAnterior.classList.add("fora");
        animando = false;
    }, 500);
}

proxButton.onclick = () => trocarItem(1);
antButton.onclick = () => trocarItem(-1);

const secoesComReveal = document.querySelectorAll("#roupas, #servicos, #sobre");

if ("IntersectionObserver" in window) {
    const observadorDeReveal = new IntersectionObserver((entradas, observador) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("reveal-visivel");
                observador.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.15 });

    secoesComReveal.forEach((secao) => {
        secao.classList.add("reveal-pendente");
        observadorDeReveal.observe(secao);
    });
}