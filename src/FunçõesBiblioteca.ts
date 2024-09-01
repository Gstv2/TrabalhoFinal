import { Livro } from "./Livro.js";
import { BibliotecaLivros } from "./Biblioteca.js";

const lista : HTMLElement  = document.getElementById('resultado');

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
    let categoria = (document.getElementById('categoria') as HTMLInputElement).value;
    if(verificarEntrada(titulo,autor,categoria)){
        console.log(titulo);
        console.log(autor);
        console.log(categoria);

        BibliotecaLivros.cadastrarLivro(titulo,autor,categoria);
        BibliotecaLivros.listarLivro();
        mostrarMensagem('Livro '+titulo+' cadastrado com sucesso')
    }
}
export function botaoRemoveClicado(){
    let titulo = (document.getElementById('titulo') as HTMLInputElement).value;
    let autor = (document.getElementById('autor') as HTMLInputElement).value;
    let categoria = (document.getElementById('categoria') as HTMLInputElement).value;
    if(verificarEntrada(titulo,autor,categoria)){
        BibliotecaLivros.removerLivro(titulo,autor,categoria);
        BibliotecaLivros.listarLivro();
        mostrarMensagem('Livro '+titulo+' removido com sucesso')
    }
}

export function botaoSearchClicado(){
    let titulo = (document.getElementById('titulo') as HTMLInputElement).value;
    let autor = (document.getElementById('autor') as HTMLInputElement).value;
    let categoria = (document.getElementById('categoria') as HTMLInputElement).value;
    let livros : Livro[] | undefined;
    livros = BibliotecaLivros.buscarLivro(titulo,autor,categoria);
    console.log(livros);
    if(livros){ 
        lista.innerHTML = '';
        for(let i: number = 0;i<livros.length;i++){
            let novoLi = converterLivrosParaLi(livros[i]);
            lista.append(novoLi);
        }
    } else {
        mostrarMensagem(`Livro ${titulo} não encontrado.`);
    }
}

function verificarEntrada(titulo:string,autor:string,categoria:string):boolean{
    if(titulo == "" || autor == "" || categoria == ""){
        mostrarMensagem('Porfavor preencher todos os campos obrigatorios!!!');
        return false;
    }else{
        return true;
    }

}

function verificarAutorTitulo(titulo:string,autor:string):boolean{
    if(titulo == "" || autor == ""){
        if(titulo == "" && autor != ""){
            mostrarMensagem('Livro não encontrado, porfavor informar titulo.');
            return false;
        }else if(titulo != "" && autor == ""){
            let livro: Livro[] = BibliotecaLivros.buscarLivro(titulo,"","");
            console.log(livro);
            let yesNot:string | null = prompt("O livro desejado é "+titulo+" da autora "+ livro[0].autor +"?\n->sim\n->não")
            if(yesNot.toLowerCase() == "sim"){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }

    }
    return true;
}

export function botaoEmprestClicado(){
    let titulo = (document.getElementById('titulo') as HTMLInputElement).value;
    let autor = (document.getElementById('autor') as HTMLInputElement).value;
    let categoria = (document.getElementById('categoria') as HTMLInputElement).value;
    let livros : Livro[];
    livros = BibliotecaLivros.buscarLivro(titulo,autor,categoria);
    console.log(livros);
    if(livros){
        if(verificarAutorTitulo(titulo,autor)){
            for(let i: number = 0;i<livros.length;i++){
                let livro: boolean = BibliotecaLivros.emprestarLivro(livros[i])
                if(livro == true){
                    mostrarMensagem('Livro '+titulo+' alugado com sucesso');
                }else{
                    mostrarMensagem('Detectamos um problema ao alugar o Livro '+titulo+" ,Este livro ja deve ter sido alugado!");
                }
            }
        }else{
            mostrarMensagem('Livro não encontrado, porfavor informar titulo e autor(a).');
        }
    }else {
        mostrarMensagem('Livro '+titulo+' não encontrado.');
    }
}
export function botaoDevolvClicado(){
    let titulo = (document.getElementById('titulo') as HTMLInputElement).value;
    let autor = (document.getElementById('autor') as HTMLInputElement).value;
    let categoria = (document.getElementById('categoria') as HTMLInputElement).value;
    let livros : Livro[];
    livros = BibliotecaLivros.buscarLivro(titulo,autor,categoria);
    console.log(livros);
    if(livros){
        if(verificarAutorTitulo(titulo,autor)){
            for(let i: number = 0;i<livros.length;i++){
                let livro: boolean = BibliotecaLivros.receberLivro(livros[i])
                if(livro == true){
                    mostrarMensagem('Livro '+titulo+' devolvido com sucesso');
                }else{
                    mostrarMensagem('Detectamos um problema ao devolver o Livro '+titulo+" esse livro não foi alugado");
                }
            }
        }else{
            mostrarMensagem('Livro não encontrado, porfavor informar titulo e autor(a).');
        }
    } else {
        mostrarMensagem('Livro não encontrado.');
    }
}


function converterLivrosParaLi(livros:Livro):HTMLElement{
    let novoLi = document.createElement('li');
    novoLi.innerHTML = 'Titulo: ' + livros.titulo + '<br> Autor: ' + livros.autor +'<br>Categoria: '+livros.categoria+' <br> Disponivel: ' + livros.disponivel +'<br>';
    return novoLi;
}

function mostrarMensagem(mensagem: string) {
    let resultadoDiv = document.getElementById('resultado');
    if(resultadoDiv) {
        resultadoDiv.innerHTML = mensagem;
    }
}