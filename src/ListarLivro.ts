import { Livro } from "./Livro.js";
import { BibliotecaLivros } from "./Biblioteca.js";

const lista : HTMLElement = document.getElementById('resultado');

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
    let titulo = (document.getElementById('titulo') as HTMLInputElement).value;
    let livros : Livro;
    livros = BibliotecaLivros.buscarLivro(titulo);
    console.log(livros);
    if(livros){
        lista.innerHTML = '';
        let novoLi = converterLivrosParaLi(livros);
        lista.append(novoLi);
    } else {
        mostrarMensagem(`Livro ${titulo} não encontrado.`);
    }
}


function converterLivrosParaLi(livros:Livro):HTMLElement{
    let novoLi = document.createElement('li');
    novoLi.innerHTML = 'Titulo: ' + livros.titulo + '<br> Autor: ' + livros.autor +'<br>Categoria: '+livros.categoria+' <br> Disponivel: R$ ' + livros.disponivel +'<br>';
    return novoLi;
}


function mostrarMensagem(mensagem: string) {
    let resultadoDiv = document.getElementById('resultado');
    if(resultadoDiv) {
        resultadoDiv.innerHTML = mensagem;
    }
}
