// programar o botão de menu para trocar e girar
let navegacao = document.querySelector('.navegacao')
let btnMenu = document.querySelector('#btn-menu')

btnMenu.onclick = () => {
    btnMenu.classList.toggle('fa-times')
    navegacao.classList.toggle('active')
}
