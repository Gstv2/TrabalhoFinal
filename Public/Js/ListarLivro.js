"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Biblioteca_js_1 = require("./Biblioteca.js");
let buttonList = document.getElementById('BotãoListar');
let lista = document.getElementById('listaLivros');
buttonList.onclick = botaoClicado;
function botaoClicado() {
    lista.innerHTML = '';
    let livros;
    livros = Biblioteca_js_1.BibliotecaLivros.listarLivro();
    let i;
    for (i = 0; i < livros.length; i++) {
        let novoLi = converterLivrosParaLi(livros[i]);
        lista.append(novoLi);
    }
}
function converterLivrosParaLi(livros) {
    let novoLi = document.createElement('li');
    novoLi.innerHTML = 'Titulo: ' + livros.titulo + '<br> Autor: ' + livros.autor + '<br>Categoria: ' + livros.categoria + ' <br> Disponivel: R$ ' + livros.disponivel + '<br>';
    return novoLi;
}
