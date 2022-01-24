import flamengo from "./flamengo.js"
import palmeiras from "./palmeiras.js"

// mostrar time
function mostrarTime(nome) {
    const sectionTimes = document.querySelector('.times')
    const logoTime = document.querySelector('.logo-time')
    const nomeTime = document.querySelector('.nome-time')
    const descricaoTime = document.querySelector('.descricao')

    // sectionTimes.style.cssText = "background-color: blue;"
    sectionTimes.style.backgroundImage = `linear-gradient(rgba(0,0,0,.9), rgba(0,0,0,.90)100%), url(${nome.fundo})`

    logoTime.src = nome.escudo
    nomeTime.textContent = nome.nome
    descricaoTime.textContent = nome.descricao
}

// programar o botão de menu para trocar e girar
let navegacao = document.querySelector('.navegacao')
let btnMenu = document.querySelector('#btn-menu')

btnMenu.onclick = () => {
    btnMenu.classList.toggle('fa-times')
    navegacao.classList.toggle('active')
}

// pegar as informações dos times dos arquivos js e setar nas tags
let timeSelecionado = "flamengo"

function apertarBtn() {
    if (timeSelecionado == "flamengo") {
        mostrarTime(flamengo)
        timeSelecionado = "palmeiras"
    } else {
        mostrarTime(palmeiras)
        timeSelecionado = "flamengo"
    }
}

const btnAnterior = document.querySelector("#btn-anterior")
const btnProximo = document.querySelector("#btn-proximo")
apertarBtn()
btnAnterior.onclick = () => {
    apertarBtn()
}
btnProximo.onclick = () => {
    apertarBtn()
}
