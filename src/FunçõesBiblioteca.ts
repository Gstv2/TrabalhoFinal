import { Livro } from "./Livro.js";
import { BibliotecaLivros } from "./Biblioteca.js";
import { Alugados } from "./Alugados.js";

const lista : HTMLElement  = document.getElementById('resultado');

export function botaoListClicado(){
    lista.innerHTML = '';
    let livros : Livro[];
    livros = BibliotecaLivros.listarLivro();
    let i: number;
    for(i=0;i<livros.length;i++){
        let novoCard = converterLivrosParaCard(livros[i]);
        lista.append(novoCard);
    }
}


export function botaoAddClicado(){
    let titulo = (document.getElementById('titulo_form') as HTMLInputElement).value;
    let autor = (document.getElementById('autor_form') as HTMLInputElement).value;
    let categoria = (document.getElementById('categoria_form') as HTMLInputElement).value;
    if(verificarEntrada(titulo,autor)){
        if(verficarLivroExistente(titulo,autor)){
            let cadastrado = BibliotecaLivros.cadastrarLivro(titulo,autor,categoria);
            if(cadastrado){
                alert('Livro '+titulo+' cadastrado com sucesso');
                botaoListClicado();
                adicionarMaisLidosNovidades();
            }
        }else{
            mostrarMensagem("livro "+titulo+" ja cadastrado!");
        }
    }
}
function verficarLivroExistente(titulo:string,autor:string){
    let livros: Livro[] | undefined = BibliotecaLivros.buscarLivro(titulo,autor);

    if(livros[0]){
        return false;
    }else{
        return true;
    }
}

export function botaoRemoveClicado(){
    let titulo = (document.getElementById('titulo') as HTMLInputElement).value;
    let autor = (document.getElementById('autor') as HTMLInputElement).value;
    if(verificarEntrada(titulo,autor)){
        if(!verficarLivroExistente(titulo,autor)){
            let removido = BibliotecaLivros.removerLivro(titulo,autor);
            if(removido){
                alert('Livro '+titulo+' removido com sucesso');
                botaoListClicado();
                adicionarMaisLidosNovidades();
            }
        }else{
            mostrarMensagem('Livro '+titulo+' não encontrado!');
        }
    }
}

export function botaoSearchClicado(){
    let titulo = (document.getElementById('titulo') as HTMLInputElement).value;
    let autor = (document.getElementById('autor') as HTMLInputElement).value;
    let livros : Livro[] | undefined;
    livros = BibliotecaLivros.buscarLivro(titulo,autor);
    if(livros){ 
        lista.innerHTML = '';
        for(let i: number = 0;i<livros.length;i++){
            let novoLi = converterLivrosParaCard(livros[i]);
            lista.append(novoLi);
        }
    } else {
        mostrarMensagem("Livro "+titulo+" não encontrado!!");
    }
}

export function botaoFilterClick(){
    let categoria = (document.getElementById('categoria') as HTMLInputElement).value;
    let disponivel = (document.getElementById('Disponivel') as HTMLInputElement).value === "true";
    let titulo = (document.getElementById('titulo') as HTMLInputElement).value;
    let autor = (document.getElementById('autor') as HTMLInputElement).value;
    let livros : Livro[] | undefined;
    livros = BibliotecaLivros.filterLivro(titulo,autor,categoria,disponivel);
    if(livros){ 
        lista.innerHTML = '';
        for(let i: number = 0;i<livros.length;i++){
            let novoLi = converterLivrosParaCard(livros[i]);
            lista.append(novoLi);
        }
    } else {
        mostrarMensagem("Nenhum livro encontrado!");
    }
}


function verificarEntrada(titulo: string, autor: string): boolean {
    let tituloTrimmed = titulo.trim();
    let autorTrimmed = autor.trim();

    if (tituloTrimmed === "" || autorTrimmed === "") {
        mostrarMensagem('Por favor preencher todos os campos obrigatórios!!!');
        return false;
    } else {
        return true;
    }
}

function verificarAutorTitulo(titulo:string,autor:string):boolean{
    if(titulo == "" || autor == ""){
        if(titulo == "" && autor != ""){
            mostrarMensagem('Livro não encontrado, porfavor informar titulo.');
            return false;
        }else if(titulo != "" && autor == ""){
            let livro: Livro[] = BibliotecaLivros.buscarLivro(titulo,autor);
            let yesNot:string | null = prompt("O livro desejado é "+titulo+" da autora "+ livro[0].autor +"?\n->sim\n->não");
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
    let titulo = (document.getElementById('titulo_alugar') as HTMLInputElement).value;
    let autor = (document.getElementById('autor_alugar') as HTMLInputElement).value;
    let nomeAluno = (document.getElementById('nome_alugar') as HTMLInputElement).value;
    let matricula = (document.getElementById('matricula_alugar') as HTMLInputElement).value;
    let dataEntrega = new Date((document.getElementById('dataEntrega') as HTMLInputElement).value);
    let livros : Livro[] | undefined;
    if(verificarEntrada(titulo,autor)){
        livros = BibliotecaLivros.buscarLivro(titulo,autor);
        if(livros){
            if(verificarAutorTitulo(titulo,autor)){
                for(let i: number = 0;i<livros.length;i++){
                    let livro: boolean = BibliotecaLivros.alugarLivro(nomeAluno,matricula,livros[i].titulo,livros[i].autor,dataEntrega);
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
}
export function botaoDevolvClicado(){
    let titulo = (document.getElementById('titulo_devolucao') as HTMLInputElement).value;
    let autor = (document.getElementById('autor_devolucao') as HTMLInputElement).value;
    let nomeAluno = (document.getElementById('nome_devolucao') as HTMLInputElement).value;
    let matricula = (document.getElementById('matricula_devolucao') as HTMLInputElement).value;
    let livros : Livro[];
    if(verificarEntrada(titulo,autor)){
        livros = BibliotecaLivros.buscarLivro(titulo,autor);
        if(livros){
            if(verificarAutorTitulo(titulo,autor)){
                for(let i: number = 0;i<livros.length;i++){
                    let livro: boolean = BibliotecaLivros.receberLivro(livros[i].titulo,livros[i].autor,nomeAluno,matricula);
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
}

function converterLivrosParaCard(livro: Livro): HTMLElement {
    let card = document.createElement('div');
    card.className = 'book-card'; // Classe para estilizar o card

    card.innerHTML = `
        <div class="card-header">
            <span class="title">${livro.titulo}</span>
        </div>
        <div class="card-body">
            <p class="author">Autor: ${livro.autor}</p>
            <p class="category">Categoria: ${livro.categoria}</p>
            <p class="availability">Disponível: ${livro.disponivel}</p>
        </div>
    `;
    
    return card;
}

function converterAlugadosParaCard(alugado: Alugados): HTMLElement {
    let card = document.createElement('div');
    card.className = 'books-Alugados'; // Classe para estilizar o card

    card.innerHTML = `
        <div class="card-header">
            <span class="title">${alugado.tituloLivro}</span>
        </div>
        <div class="card-body">
            <p class="author">Autor: ${alugado.autorLivro}</p>
            <p class="category">Nome: ${alugado.nomeAluno}</p>
            <p class="availability">Matricula: ${alugado.matricula}</p>
        </div>
    `;
    
    return card;
}

// Função para adicionar livros à seção "Mais Lidos"
export function adicionarMaisLidosNovidades() {
    const containerMaisLidos: HTMLElement = document.getElementById('books-MaisLidos');
    const containerNovidades: HTMLElement = document.getElementById('books-Novidades');
    let maisLidos: Livro[] = [];
    let Novidades: Livro[] = [];
    let livros: Livro[] = BibliotecaLivros.listarLivro();
    let i: number;
    for(i = 0;i<8;i++){
        maisLidos.push(livros[i]);
    }
    for(i = 0;i<maisLidos.length;i++){
        let novoCard = converterLivrosParaCard(maisLidos[i]);
        containerMaisLidos.append(novoCard);
    }
    for(i = livros.length-8;i<livros.length;i++){
        Novidades.push(livros[i]);
    }
    for(i = 0;i<Novidades.length;i++){
        let novoCardNovidades = converterLivrosParaCard(Novidades[i]);
        containerNovidades.append(novoCardNovidades);
    }
}



function mostrarMensagem(mensagem: string) {
    let resultadoDiv = document.getElementById('resultado-text');
    if(resultadoDiv) {
        resultadoDiv.innerHTML = mensagem;
    }
}