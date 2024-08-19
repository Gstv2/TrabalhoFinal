import { Livro } from "./Livro.js";
import { BibliotecaLivros } from "./Biblioteca.js";

let buttonList : HTMLElement = document.getElementById('BotãoListar');
let lista : HTMLElement = document.getElementById('listaLivros');

buttonList.onclick = botaoClicado;


function botaoClicado(){
    lista.innerHTML = '';
    let livros : Livro[];
    livros = BibliotecaLivros.listarLivro();
    let i;
    for(i=0;i<livros.length;i++){
        let novoLi = converterLivrosParaLi(livros[i]);
        lista.append(novoLi);
    }
}


function converterLivrosParaLi(livros:Livro):HTMLElement{
    let novoLi = document.createElement('li');
    novoLi.innerHTML = 'Titulo: ' + livros.titulo + '<br> Autor: ' + livros.autor +'<br>Categoria: '+livros.categoria+' <br> Disponivel: R$ ' + livros.disponivel +'<br>';
    return novoLi;
}
