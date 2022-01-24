import flamengo from "./flamengo.js"
import palmeiras from "./palmeiras.js"

// botaão menu
let menuPrincipal = document.querySelector('.menu-principal')
let btnMenu = document.querySelector('#btn-menu')
btnMenu.onclick = () => {
    btnMenu.classList.toggle('fa-times')
    menuPrincipal.classList.toggle('active')
}
