import flamengo from "./flamengo.js"
import palmeiras from "./palmeiras.js"

// botaão menu
let menuPrincipal = document.querySelector('.menu-principal')
let btnMenu = document.querySelector('#btn-menu')
btnMenu.onclick = () => {
    btnMenu.classList.toggle('fa-times')
    menuPrincipal.classList.toggle('active')
}

function carregarTime() {
    const sectionTimes = document.querySelector('main')
    const logoTime = document.querySelector('.logo-time')
    const nomeTime = document.querySelector('.nome-time')
    const descricaoTime = document.querySelector('.descricao-time')

    let gradImg = `linear-gradient(rgba(0,0,0,.9), rgba(0,0,0,.90)100%), url(${flamengo.fundo})`
    sectionTimes.style.backgroundImage = gradImg
    logoTime.src = flamengo.escudo
    nomeTime.textContent = flamengo.nome
    descricaoTime.textContent = flamengo.descricao
}

function slideJogador(jogador, numero) {
    const divWrapper = document.querySelector('.swiper-wrapper')

    const divSlide = document.createElement('div')
    divSlide.classList.add("swiper-slide")
    divSlide.classList.add("slide")
    divSlide.setAttribute("data-name", numero)
    divWrapper.appendChild(divSlide)

    novoJogador(jogador, numero, divSlide)
}

function novoJogador(jogador, numero, div) {

    const divJogador = document.createElement('div')
    divJogador.classList.add("jogador")
    div.appendChild(divJogador)

    const numeroJogador = document.createElement('h2')
    numeroJogador.classList.add("numero-jogador")
    numeroJogador.textContent = numero
    divJogador.appendChild(numeroJogador)

    const imagemJogador = document.createElement('img')
    imagemJogador.classList.add("imagem-jogador")
    imagemJogador.src = jogador.imagem
    imagemJogador.alt = jogador.nome
    divJogador.appendChild(imagemJogador)

    const nomeJogador = document.createElement('h2')
    nomeJogador.classList.add("nome-jogador")
    nomeJogador.textContent = jogador.nome
    divJogador.appendChild(nomeJogador)

    const posicaoJogador = document.createElement('h3')
    posicaoJogador.classList.add("posicao-jogador")
    posicaoJogador.textContent = jogador.posicao
    divJogador.appendChild(posicaoJogador)
}

function verJogador(jogador, numero) {
    const div = document.querySelector('#ver-jogadores')

    const divJogador = document.createElement('div')
    divJogador.classList.add("ver-jogador")
    divJogador.setAttribute('data-target', numero)
    div.appendChild(divJogador)

    novoJogador(jogador, numero, divJogador)

    const divDados = document.createElement('div')
    divDados.classList.add("dados-jogador")
    divJogador.appendChild(divDados)

    const nomeCompleto = document.createElement('p')
    nomeCompleto.textContent = jogador.nome_completo
    divDados.appendChild(nomeCompleto)

    const nascimento = document.createElement('p')
    nascimento.textContent = jogador.nascimento
    divDados.appendChild(nascimento)

    const cidade = document.createElement('p')
    cidade.textContent = jogador.cidade
    divDados.appendChild(cidade)
}

carregarTime()

// pegar o número dos jogadores
for (let numero in flamengo.jogadores) {
    slideJogador(flamengo.jogadores[numero], numero)
    verJogador(flamengo.jogadores[numero], numero)
}

var swiper = new Swiper(".slide-jogadores", {
    grabCursor: true,
    loop: true,
    centeredSlides: true,
    spaceBetween: 0,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        700: {
            slidesPerView: 2,
        },
        1000: {
            slidesPerView: 5,
        },
    },
})

let divVerJogadores = document.querySelector('#ver-jogadores')
let divVerJogador = divVerJogadores.querySelectorAll('.ver-jogador')
document.querySelectorAll('.slide').forEach(jogador => {
    jogador.onclick = () => {
        let name = jogador.getAttribute('data-name')
        divVerJogador.forEach(preview => {
            divVerJogadores.style.display = 'flex'
            let target = preview.getAttribute('data-target')
            if (name == target) {
                preview.classList.add('active')
            }
        })
    }
})

divVerJogadores.querySelector('#fechar-ver').onclick = () => {
    divVerJogadores.style.display = 'none'
    divVerJogador.forEach(fechar => {
        fechar.classList.remove('active')
    })
}
