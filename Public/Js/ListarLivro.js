import { BibliotecaLivros } from "./Biblioteca.js";
const lista = document.getElementById('resultado');
export function botaoListClicado() {
    lista.innerHTML = '';
    let livros;
    livros = BibliotecaLivros.listarLivro();
    let i;
    for (i = 0; i < livros.length; i++) {
        let novoLi = converterLivrosParaLi(livros[i]);
        lista.append(novoLi);
    }
}
export function botaoAddClicado() {
    let titulo = document.getElementById('titulo').value;
    let autor = document.getElementById('autor').value;
    let data_publicacao = new Date(document.getElementById('data_publicacao').value);
    let categoria = document.getElementById('categoria').value;
    console.log(titulo);
    console.log(autor);
    console.log(categoria);
    console.log(data_publicacao);
    BibliotecaLivros.cadastrarLivro(data_publicacao, titulo, autor, categoria);
    BibliotecaLivros.listarLivro();
    mostrarMensagem('Livro ' + titulo + ' cadastrado com sucesso');
}
export function botaoRemoveClicado() {
    let titulo = document.getElementById('titulo').value;
    BibliotecaLivros.removerLivro(titulo);
    BibliotecaLivros.listarLivro();
    mostrarMensagem('Livro ' + titulo + ' removido com sucesso');
}
export function botaoSearchClicado() {
    let titulo = document.getElementById('titulo').value;
    let livros;
    livros = BibliotecaLivros.buscarLivro(titulo);
    console.log(livros);
    if (livros) {
        lista.innerHTML = '';
        let novoLi = converterLivrosParaLi(livros);
        lista.append(novoLi);
    }
    else {
        mostrarMensagem(`Livro ${titulo} não encontrado.`);
    }
}
function converterLivrosParaLi(livros) {
    let novoLi = document.createElement('li');
    novoLi.innerHTML = 'Titulo: ' + livros.titulo + '<br> Autor: ' + livros.autor + '<br>Categoria: ' + livros.categoria + ' <br> Disponivel: R$ ' + livros.disponivel + '<br>';
    return novoLi;
}
function mostrarMensagem(mensagem) {
    let resultadoDiv = document.getElementById('resultado');
    if (resultadoDiv) {
        resultadoDiv.innerHTML = mensagem;
    }
}
