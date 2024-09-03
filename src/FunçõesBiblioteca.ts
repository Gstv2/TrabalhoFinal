import { Livro } from "./Livro.js"; // Importa a classe Livro do arquivo Livro.js
import { BibliotecaLivros } from "./Biblioteca.js"; // Importa a instância BibliotecaLivros do arquivo Biblioteca.js
import { Alugados } from "./Alugados.js"; // Importa a classe Alugados do arquivo Alugados.js

const lista : HTMLElement  = document.getElementById('resultado'); // Obtém o elemento HTML com o ID 'resultado' e o tipa como HTMLElement

export function botaoListClicado(){
    lista.innerHTML = ''; // Limpa o conteúdo do elemento 'resultado'
    let livros : Livro[]; // Declara uma variável para armazenar um array de objetos Livro
    livros = BibliotecaLivros.listarLivro(); // Obtém a lista de livros da instância BibliotecaLivros
    let i: number; // Declara uma variável de controle para o loop
    for(i=0;i<livros.length;i++){ // Itera sobre todos os livros
        let novoCard = converterLivrosParaCard(livros[i]); // Converte cada livro para um card HTML
        lista.append(novoCard); // Adiciona o card ao elemento 'resultado'
    }
}

export function botaoAddClicado(){
    let titulo = (document.getElementById('titulo_form') as HTMLInputElement).value; // Obtém o valor do campo de entrada 'titulo_form'
    let autor = (document.getElementById('autor_form') as HTMLInputElement).value; // Obtém o valor do campo de entrada 'autor_form'
    let categoria = (document.getElementById('categoria_form') as HTMLInputElement).value; // Obtém o valor do campo de entrada 'categoria_form'
    if(verificarEntrada(titulo,autor)){ // Verifica se os campos obrigatórios foram preenchidos
        if(verficarLivroExistente(titulo,autor)){ // Verifica se o livro já está cadastrado
            BibliotecaLivros.cadastrarLivro(titulo,autor,categoria); // Cadastra o livro na biblioteca
            alert('Livro '+titulo+' cadastrado com sucesso'); // Exibe uma mensagem de sucesso
            botaoListClicado(); // Atualiza a lista de livros
            adicionarMaisLidosNovidades(); // Atualiza as seções de mais lidos e novidades
        }else{
            mostrarMensagem("livro "+titulo+" ja cadastrado!"); // Exibe uma mensagem se o livro já estiver cadastrado
        }
    }
}

function verficarLivroExistente(titulo:string,autor:string){
    let livros: Livro[] | undefined = BibliotecaLivros.buscarLivro(titulo,autor); // Busca o livro na biblioteca

    if(livros[0]){
        return false; // Retorna false se o livro já existir
    }else{
        return true; // Retorna true se o livro não existir
    }
}

export function botaoRemoveClicado(){
    let titulo = (document.getElementById('titulo') as HTMLInputElement).value; // Obtém o valor do campo de entrada 'titulo'
    let autor = (document.getElementById('autor') as HTMLInputElement).value; // Obtém o valor do campo de entrada 'autor'
    if(verificarEntrada(titulo,autor)){ // Verifica se os campos obrigatórios foram preenchidos
        if(!verficarLivroExistente(titulo,autor)){ // Verifica se o livro está cadastrado
            BibliotecaLivros.removerLivro(titulo,autor); // Remove o livro da biblioteca
            alert('Livro '+titulo+' removido com sucesso'); // Exibe uma mensagem de sucesso
            botaoListClicado(); // Atualiza a lista de livros
            adicionarMaisLidosNovidades(); // Atualiza as seções de mais lidos e novidades
        }else{
            mostrarMensagem('Livro '+titulo+' não encontrado!'); // Exibe uma mensagem se o livro não for encontrado
        }
    }
}

export function botaoSearchClicado(){
    let titulo = (document.getElementById('titulo') as HTMLInputElement).value; // Obtém o valor do campo de entrada 'titulo'
    let autor = (document.getElementById('autor') as HTMLInputElement).value; // Obtém o valor do campo de entrada 'autor'
    let livros : Livro[] | undefined;
    livros = BibliotecaLivros.buscarLivro(titulo,autor); // Busca o livro na biblioteca
    if(livros){ 
        lista.innerHTML = ''; // Limpa o conteúdo do elemento 'resultado'
        for(let i: number = 0;i<livros.length;i++){ // Itera sobre os livros encontrados
            let novoLi = converterLivrosParaCard(livros[i]); // Converte o livro para um card HTML
            lista.append(novoLi); // Adiciona o card ao elemento 'resultado'
        }
    } else {
        mostrarMensagem("Livro "+titulo+" não encontrado!!"); // Exibe uma mensagem se o livro não for encontrado
    }
}

export function botaoFilterClick(){
    let categoria = (document.getElementById('categoria') as HTMLInputElement).value; // Obtém o valor do campo de entrada 'categoria'
    let disponivel = (document.getElementById('Disponivel') as HTMLInputElement).value === "true"; // Obtém o valor do campo de entrada 'Disponivel' e converte para booleano
    let titulo = (document.getElementById('titulo') as HTMLInputElement).value; // Obtém o valor do campo de entrada 'titulo'
    let autor = (document.getElementById('autor') as HTMLInputElement).value; // Obtém o valor do campo de entrada 'autor'
    let livros : Livro[] | undefined;
    livros = BibliotecaLivros.filterLivro(titulo,autor,categoria,disponivel); // Filtra os livros na biblioteca
    if(livros){ 
        lista.innerHTML = ''; // Limpa o conteúdo do elemento 'resultado'
        for(let i: number = 0;i<livros.length;i++){ // Itera sobre os livros filtrados
            let novoLi = converterLivrosParaCard(livros[i]); // Converte o livro para um card HTML
            lista.append(novoLi); // Adiciona o card ao elemento 'resultado'
        }
    } else {
        mostrarMensagem("Nenhum livro encontrado!"); // Exibe uma mensagem se nenhum livro for encontrado
    }
}

function verificarEntrada(titulo: string, autor: string): boolean {
    let tituloTrimmed = titulo.trim(); // Remove espaços em branco do início e do final do título
    let autorTrimmed = autor.trim(); // Remove espaços em branco do início e do final do autor

    if (tituloTrimmed === "" || autorTrimmed === "") { // Verifica se algum campo está vazio
        mostrarMensagem('Por favor preencher todos os campos obrigatórios!!!'); // Exibe uma mensagem solicitando preenchimento dos campos
        return false; // Retorna false se algum campo estiver vazio
    } else {
        return true; // Retorna true se todos os campos estiverem preenchidos
    }
}

function verificarAutorTitulo(titulo:string,autor:string):boolean{
    if(titulo == "" || autor == ""){ // Verifica se o título ou autor está vazio
        if(titulo == "" && autor != ""){ // Se apenas o título estiver vazio
            mostrarMensagem('Livro não encontrado, porfavor informar titulo.'); // Solicita preenchimento do título
            return false; // Retorna false
        }else if(titulo != "" && autor == ""){ // Se apenas o autor estiver vazio
            let livro: Livro[] = BibliotecaLivros.buscarLivro(titulo,autor); // Busca o livro na biblioteca
            let yesNot:string | null = prompt("O livro desejado é "+titulo+" da autora "+ livro[0].autor +"?\n->sim\n->não"); // Pergunta ao usuário se o livro encontrado é o desejado
            if(yesNot.toLowerCase() == "sim"){ // Se o usuário confirmar
                return true; // Retorna true
            }else{
                return false; // Retorna false
            }
        }else{
            return false; // Retorna false se ambos estiverem vazios
        }
    }
    return true; // Retorna true se título e autor estiverem preenchidos
}

export function botaoEmprestClicado(){
    let titulo = (document.getElementById('titulo_alugar') as HTMLInputElement).value; // Obtém o valor do campo de entrada 'titulo_alugar'
    let autor = (document.getElementById('autor_alugar') as HTMLInputElement).value; // Obtém o valor do campo de entrada 'autor_alugar'
    let nomeAluno = (document.getElementById('nome_alugar') as HTMLInputElement).value; // Obtém o valor do campo de entrada 'nome_alugar'
    let matricula = (document.getElementById('matricula_alugar') as HTMLInputElement).value; // Obtém o valor do campo de entrada 'matricula_alugar'
    let dataEntrega = new Date((document.getElementById('dataEntrega') as HTMLInputElement).value); // Obtém a data de entrega e cria um objeto Date
    let livros : Livro[] | undefined;
    if(verificarEntrada(titulo,autor)){ // Verifica se os campos obrigatórios foram preenchidos
        livros = BibliotecaLivros.buscarLivro(titulo,autor); // Busca o livro na biblioteca
        if(livros){
            if(verificarAutorTitulo(titulo,autor)){ // Verifica se o livro encontrado é o desejado
                for(let i: number = 0;i<livros.length;i++){ // Itera sobre os livros encontrados
                    let livro: boolean = BibliotecaLivros.alugarLivro(nomeAluno,matricula,livros[i].titulo,livros[i].autor,dataEntrega); // Tenta alugar o livro
                    if(livro == true){
                        mostrarMensagem('Livro '+titulo+' alugado com sucesso'); // Exibe uma mensagem de sucesso
                    }else{
                        mostrarMensagem('Detectamos um problema ao alugar o Livro '+titulo+" ,Este livro ja deve ter sido alugado!"); // Exibe uma mensagem de erro se o livro já estiver alugado
                    }
                }
            }else{
                mostrarMensagem('Livro não encontrado, porfavor informar titulo e autor(a).'); // Solicita preenchimento de título e autor se o livro não for encontrado
            }
        }else {
            mostrarMensagem('Livro '+titulo+' não encontrado.'); // Exibe uma mensagem se o livro não for encontrado
        }
    }
}

export function botaoDevolvClicado(){
    let titulo = (document.getElementById('titulo_devolucao') as HTMLInputElement).value; // Obtém o valor do campo de entrada 'titulo_devolucao'
    let autor = (document.getElementById('autor_devolucao') as HTMLInputElement).value; // Obtém o valor do campo de entrada 'autor_devolucao'
    let nomeAluno = (document.getElementById('nome_devolucao') as HTMLInputElement).value; // Obtém o valor do campo de entrada 'nome_devolucao'
    let matricula = (document.getElementById('matricula_devolucao') as HTMLInputElement).value; // Obtém o valor do campo de entrada 'matricula_devolucao'
    let livros : Livro[];
    if(verificarEntrada(titulo,autor)){ // Verifica se os campos obrigatórios foram preenchidos
        livros = BibliotecaLivros.buscarLivro(titulo,autor); // Busca o livro na biblioteca
        if(livros){
            if(verificarAutorTitulo(titulo,autor)){ // Verifica se o livro encontrado é o desejado
                for(let i: number = 0;i<livros.length;i++){ // Itera sobre os livros encontrados
                    let livro: boolean = BibliotecaLivros.receberLivro(livros[i].titulo,livros[i].autor,nomeAluno,matricula); // Tenta devolver o livro
                    if(livro == true){
                        mostrarMensagem('Livro '+titulo+' devolvido com sucesso'); // Exibe uma mensagem de sucesso
                    }else{
                        mostrarMensagem('Detectamos um problema ao devolver o Livro '+titulo+" esse livro não foi alugado"); // Exibe uma mensagem de erro se o livro não foi alugado
                    }
                }
            }else{
                mostrarMensagem('Livro não encontrado, porfavor informar titulo e autor(a).'); // Solicita preenchimento de título e autor se o livro não for encontrado
            }
        } else {
            mostrarMensagem('Livro não encontrado.'); // Exibe uma mensagem se o livro não for encontrado
        }
    }
}

function converterLivrosParaCard(livro: Livro): HTMLElement {
    let card = document.createElement('div'); // Cria um novo elemento 'div'
    card.className = 'book-card'; // Adiciona a classe 'book-card' ao elemento 'div'

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
    
    return card; // Retorna o elemento 'div' com o conteúdo do card
}

function converterAlugadosParaCard(alugado: Alugados): HTMLElement {
    let card = document.createElement('div'); // Cria um novo elemento 'div'
    card.className = 'books-Alugados'; // Adiciona a classe 'books-Alugados' ao elemento 'div'

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
    
    return card; // Retorna o elemento 'div' com o conteúdo do card
}

// Função para adicionar livros à seção "Mais Lidos"
export function adicionarMaisLidosNovidades() {
    const containerMaisLidos: HTMLElement = document.getElementById('books-MaisLidos'); // Obtém o elemento HTML com o ID 'books-MaisLidos'
    const containerNovidades: HTMLElement = document.getElementById('books-Novidades'); // Obtém o elemento HTML com o ID 'books-Novidades'
    let maisLidos: Livro[] = []; // Declara uma lista para armazenar os livros mais lidos
    let Novidades: Livro[] = []; // Declara uma lista para armazenar os livros novidades
    let livros: Livro[] = BibliotecaLivros.listarLivro(); // Obtém a lista de livros da biblioteca
    let i: number; // Declara uma variável de controle para o loop
    for(i = 0;i<8;i++){ // Adiciona os primeiros 8 livros à lista de mais lidos
        maisLidos.push(livros[i]);
    }
    for(i = 0;i<maisLidos.length;i++){ // Itera sobre os livros mais lidos
        let novoCard = converterLivrosParaCard(maisLidos[i]); // Converte o livro para um card HTML
        containerMaisLidos.append(novoCard); // Adiciona o card ao contêiner 'Mais Lidos'
    }
    for(i = livros.length-8;i<livros.length;i++){ // Adiciona os últimos 8 livros à lista de novidades
        Novidades.push(livros[i]);
    }
    for(i = 0;i<Novidades.length;i++){ // Itera sobre os livros novidades
        let novoCardNovidades = converterLivrosParaCard(Novidades[i]); // Converte o livro para um card HTML
        containerNovidades.append(novoCardNovidades); // Adiciona o card ao contêiner 'Novidades'
    }
}

function mostrarMensagem(mensagem: string) {
    let resultadoDiv = document.getElementById('resultado-text'); // Obtém o elemento HTML com o ID 'resultado-text'
    if(resultadoDiv) {
        resultadoDiv.innerHTML = mensagem; // Atualiza o conteúdo do elemento com a mensagem fornecida
    }
}
