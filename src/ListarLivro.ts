import { Livro } from "./Livro.js";
import { BibliotecaLivros } from "./Biblioteca.js";

let titulo : string = document.getElementById('titulo');
let autor : HTMLElement = document.getElementById('autor');
let data_publicacao : HTMLElement = document.getElementById('data_publicacao');
let categoria : HTMLElement = document.getElementById('categoria');


let buttonList : HTMLElement = document.getElementById('BotãoListar');
let buttonAdd : HTMLElement = document.getElementById('adicionar');
let buttonRemove : HTMLElement = document.getElementById('remover');
let buttonSearch : HTMLElement = document.getElementById('buscar');
let lista : HTMLElement = document.getElementById('resultado');

export function botaoListClicado(){
    lista.innerHTML = '';
    let livros : Livro[];
    livros = BibliotecaLivros.listarLivro();
    let i;
    for(i=0;i<livros.length;i++){
        let novoLi = converterLivrosParaLi(livros[i]);
        lista.append(novoLi);
    }
}

export function botaoAddClicado(){
    lista.innerHTML = '';
    let livros : Livro[];
    livros = BibliotecaLivros.cadastrarLivro(data_publicacao,titulo,autor,categoria);
    let i;
    for(i=0;i<livros.length;i++){
        let novoLi = converterLivrosParaLi(livros[i]);
        lista.append(novoLi);
    }
}
export function botaoRemoveClicado(){
    lista.innerHTML = '';
    let livros : Livro[];
    livros = BibliotecaLivros.listarLivro();
    let i;
    for(i=0;i<livros.length;i++){
        let novoLi = converterLivrosParaLi(livros[i]);
        lista.append(novoLi);
    }
}
export function botaoSearchClicado(){
    lista.innerHTML = '';
    let livros : Livro[];
    livros = BibliotecaLivros.buscarLivro(titulo);
    let novoLi = converterLivrosParaLi(livros);
    lista.append(novoLi);
}


function converterLivrosParaLi(livros:Livro):HTMLElement{
    let novoLi = document.createElement('li');
    novoLi.innerHTML = 'Titulo: ' + livros.titulo + '<br> Autor: ' + livros.autor +'<br>Categoria: '+livros.categoria+' <br> Disponivel: R$ ' + livros.disponivel +'<br>';
    return novoLi;
}
