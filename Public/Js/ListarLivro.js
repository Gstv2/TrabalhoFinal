import { BibliotecaLivros } from "./Biblioteca.js";
let buttonList = document.getElementById('BotãoListar');
let lista = document.getElementById('resultado');
export function botaoClicado() {
    lista.innerHTML = '';
    let livros;
    livros = BibliotecaLivros.listarLivro();
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
