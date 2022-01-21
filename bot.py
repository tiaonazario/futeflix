import requests
from bs4 import BeautifulSoup
import pandas as pd


def raspar(url, tag, cls):
    headers = {'User-Agent':
               'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36'}
    page = requests.get(url, headers=headers)
    soup = BeautifulSoup(page.content, 'html.parser')
    lista = soup.find_all(tag, {"class": cls})
    return lista


def buscar(dados, tag, cls):
    return dados.find_all(tag, {"class": cls})


def extensao(nome):
    index = nome.rfind('.')
    return nome[index:]


def baixar(url, endereco):
    url = str(url)
    resposta = requests.get(url)
    if resposta.status_code == requests.codes.OK:
        with open(endereco, 'wb') as novo:
            novo.write(resposta.content)
            print(f"Imagem salva em: {endereco}")
    else:
        resposta.raise_for_status()


def atleta(url):
    html = raspar(url, 'div', 'row py-3 magic-row')[0]

    cls0 = 'text-danger d-flex justify-content-center align-items-center font-weight-bold shirt-number'
    cls1 = 'text-white text-uppercase'
    cls2 = 'img-fluid d-none d-md-inline-block img-persona'

    numero = buscar(html, 'span', cls0)[0].get_text().strip()
    nome = buscar(html, 'h2', cls1)[0].get_text().strip()
    nome_completo = buscar(html, 'p', cls1)[0].get_text().strip()
    posicao = buscar(html, 'li', cls1)[0].get_text().strip()
    nascimento = buscar(html, 'li', cls1)[1].get_text().strip()
    cidade = buscar(html, 'li', cls1)[2].get_text().strip()
    link_img = buscar(html, 'img', cls2)[0]['src']

    posicao = posicao.replace("Posição: ", "")
    nascimento = nascimento.replace("Nascimento: ", "")[0:10]
    cidade = cidade.replace("Cidade: ", "")

    ext = extensao(link_img)
    imagem = f"img/jogadores/flamengo_{numero}{ext}"

    dicionario = {
        "nome": nome,
        "nome_completo": nome_completo,
        "posicao": posicao,
        "nascimento": nascimento,
        "cidade": cidade,
        "imagem": imagem,
        "link_img": link_img
    }

    print(f"{numero}: {nome}, {nome_completo}, {posicao}, {nascimento}, {cidade}")
    baixar(link_img, imagem)
    return [str(numero), dicionario]


def elenco(url, cls='elenco-atleta'):
    dicionario = {}
    elencoHTML = raspar(url, 'div', cls)

    for html in elencoHTML:
        link = html.a['href']
        dados = atleta(link)
        dicionario[dados[0]] = dados[1]

    return dicionario


def flamengo():
    url = "https://www.flamengo.com.br/elencos/elenco-profissional"
    colunas = ['nome', 'nome_completo', 'posicao',
               'nascimento', 'cidade', 'imagem', 'link_img']
    df = pd.DataFrame(elenco(url))
    df.to_json('assets/json/flamengo.json')


def palmeiras():
    url = "https://www.palmeiras.com.br/elenco/"
    elencoHTML = raspar(url, "div", "box-elenco")

    dicionario = {}
    for jogadorHTML in elencoHTML:
        jogador = jogadorHTML.a
        link_jogador = jogador["href"]
        link_img = jogador.img["src"]
        numero = jogador.h4.get_text().strip()
        nome = jogador.div.h6.get_text().strip()
        posicao = jogador.div.p.get_text().strip()
        if numero == "":
            numero = 33

        dadosJogadorHTML = raspar(link_jogador, "div", "dados-jogador")
        for dadoHTML in dadosJogadorHTML:
            conteudoHTML = buscar(dadoHTML, "div", "row quadro-content")[0]
            colunaHTML = conteudoHTML.find_all("span")
            nome_completo = colunaHTML[0].get_text().strip()
            nascimento = colunaHTML[1].get_text().strip()
            cidade = colunaHTML[2].get_text().strip()

            ext = extensao(link_img)
            imagem = f"img/jogadores/palmeiras_{numero}{ext}"

            dict_num = {
                "nome": nome,
                "nome_completo": nome_completo,
                "posicao": posicao,
                "nascimento": nascimento,
                "cidade": cidade,
                "imagem": imagem,
                "link_img": link_img
            }

            print(
                f"{numero}: {nome}, {nome_completo}, {posicao}, {nascimento}, {cidade}")
            baixar(link_img, imagem)

            dicionario[str(numero)] = dict_num

    df = pd.DataFrame(dicionario)
    df.to_json('assets/json/palmeiras.json')
    print("json salvo em: 'assets/json/palmeiras.json'")


# palmeiras()
