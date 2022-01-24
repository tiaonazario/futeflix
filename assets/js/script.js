import flamengo from "./flamengo.js"
import palmeiras from "./palmeiras.js"

// botaão menu
let menuPrincipal = document.querySelector('.menu-principal')
let btnMenu = document.querySelector('#btn-menu')
btnMenu.onclick = () => {
    btnMenu.classList.toggle('fa-times')
    menuPrincipal.classList.toggle('active')
}

const sectionTimes = document.querySelector('#times')
const logoTime = document.querySelector('.logo-time')
const nomeTime = document.querySelector('.nome-time')
const descricaoTime = document.querySelector('.descricao-time')

sectionTimes.style.backgroundImage = `linear-gradient(rgba(0,0,0,.9), rgba(0,0,0,.90)100%), url(${flamengo.fundo})`
logoTime.src = flamengo.escudo
nomeTime.textContent = flamengo.nome
descricaoTime.textContent = flamengo.descricao
