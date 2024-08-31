import { Livro } from "./Livro.js";
import { BibliotecaLivros } from "./Biblioteca.js";


export function botaoListClicado(){
    const lista : HTMLElement = document.getElementById('resultado');
    lista.innerHTML = '';
    let livros : Livro[];
    livros = BibliotecaLivros.listarLivro();
    let i;
    for(i=0;i<livros.length;i++){
        let novoCard = converterLivrosParaCard(livros[i]);
        lista.append(novoCard);
    }
}

export function botaoAddClicado(){
    let titulo = (document.getElementById('titulo') as HTMLInputElement).value;
    let autor = (document.getElementById('autor') as HTMLInputElement).value;
    let data_publicacao = new Date((document.getElementById('data_publicacao') as HTMLInputElement).value);
    let categoria = (document.getElementById('categoria') as HTMLInputElement).value;
    console.log(titulo);
    console.log(autor);
    console.log(categoria);
    console.log(data_publicacao);
    BibliotecaLivros.cadastrarLivro(data_publicacao,titulo,autor,categoria);
    BibliotecaLivros.listarLivro();
    mostrarMensagem('Livro '+titulo+' cadastrado com sucesso')
}


export function botaoRemoveClicado(){
    let titulo = (document.getElementById('titulo') as HTMLInputElement).value;
    BibliotecaLivros.removerLivro(titulo);
    BibliotecaLivros.listarLivro();
    mostrarMensagem('Livro '+titulo+' removido com sucesso')
}
export function botaoSearchClicado(){
    const lista : HTMLElement = document.getElementById('resultado');
    let titulo = (document.getElementById('tituloSearch') as HTMLInputElement).value;
    let livros : Livro;
    livros = BibliotecaLivros.buscarLivro(titulo);
    console.log(livros);
    if(livros){
        lista.innerHTML = '';
        let novoCard = converterLivrosParaCard(livros);
        lista.append(novoCard);
    } else {
        mostrarMensagem('Livro '+titulo+ ' não encontrado.');
    }
}


function converterLivrosParaCard(livro: Livro): HTMLElement {
    let novoCard = document.createElement('div');
    novoCard.classList.add('card', 'mb-3');
    novoCard.innerHTML = 
        '<h5 class="card-title">Título do Livro: ' + livro.titulo + '</h5>' +
        '<p class="card-text">Autor: ' + livro.autor + '</p>' +
        '<p class="card-text">Categoria: ' + livro.categoria + '</p>' +
        '<p class="card-text">Data de Publicação: ' + livro.disponivel + '</p>';
    return novoCard;
}

function mostrarMensagem(mensagem: string) {
    let resultadoDiv = document.getElementById('resultado');
    if(resultadoDiv) {
        resultadoDiv.innerHTML = mensagem;
    }
}
