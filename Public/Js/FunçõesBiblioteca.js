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
    let categoria = document.getElementById('categoria').value;
    if (verificarEntrada(titulo, autor)) {
        if (verficarLivroExistente(titulo, autor)) {
            let cadastrado = BibliotecaLivros.cadastrarLivro(titulo, autor, categoria);
            if (cadastrado) {
                alert('Livro ' + titulo + ' cadastrado com sucesso');
                botaoListClicado();
            }
            else {
                mostrarMensagem('Livro ' + titulo + ' não encontrado!');
            }
        }
        else {
            mostrarMensagem("livro " + titulo + " ja cadastrado!");
        }
    }
}
function verficarLivroExistente(titulo, autor) {
    let livros = BibliotecaLivros.buscarLivro(titulo, autor);
    if (livros[0]) {
        return false;
    }
    else {
        return true;
    }
}
export function botaoRemoveClicado() {
    let titulo = document.getElementById('titulo').value;
    let autor = document.getElementById('autor').value;
    if (verificarEntrada(titulo, autor)) {
        if (!verficarLivroExistente(titulo, autor)) {
            let removido = BibliotecaLivros.removerLivro(titulo, autor);
            if (removido) {
                alert('Livro ' + titulo + ' removido com sucesso');
                botaoListClicado();
            }
            else {
                mostrarMensagem('Livro ' + titulo + ' não encontrado!');
            }
        }
        else {
            mostrarMensagem('Livro ' + titulo + ' não encontrado!');
        }
    }
}
export function botaoSearchClicado() {
    let titulo = document.getElementById('titulo').value;
    let autor = document.getElementById('autor').value;
    let livros;
    livros = BibliotecaLivros.buscarLivro(titulo, autor);
    if (livros) {
        lista.innerHTML = '';
        for (let i = 0; i < livros.length; i++) {
            let novoLi = converterLivrosParaLi(livros[i]);
            lista.append(novoLi);
        }
    }
    else {
        mostrarMensagem("Livro " + titulo + " não encontrado!!");
    }
}
export function botaoFilterClick() {
    let categoria = document.getElementById('categoria').value;
    let disponivel = document.getElementById('Disponivel').value === "true";
    let titulo = document.getElementById('titulo').value;
    let autor = document.getElementById('autor').value;
    let livros;
    livros = BibliotecaLivros.filterLivro(titulo, autor, categoria, disponivel);
    if (livros) {
        lista.innerHTML = '';
        for (let i = 0; i < livros.length; i++) {
            let novoLi = converterLivrosParaLi(livros[i]);
            lista.append(novoLi);
        }
    }
    else {
        mostrarMensagem("Nenhum livro encontrado!");
    }
}
function verificarEntrada(titulo, autor) {
    let tituloTrimmed = titulo.trim();
    let autorTrimmed = autor.trim();
    if (tituloTrimmed === "" || autorTrimmed === "") {
        mostrarMensagem('Por favor preencher todos os campos obrigatórios!!!');
        return false;
    }
    else {
        return true;
    }
}
function verificarAutorTitulo(titulo, autor) {
    if (titulo == "" || autor == "") {
        if (titulo == "" && autor != "") {
            mostrarMensagem('Livro não encontrado, porfavor informar titulo.');
            return false;
        }
        else if (titulo != "" && autor == "") {
            let livro = BibliotecaLivros.buscarLivro(titulo, autor);
            let yesNot = prompt("O livro desejado é " + titulo + " da autora " + livro[0].autor + "?\n->sim\n->não");
            if (yesNot.toLowerCase() == "sim") {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    return true;
}
export function botaoEmprestClicado() {
    let titulo = document.getElementById('titulo').value;
    let autor = document.getElementById('autor').value;
    let livros;
    if (verificarEntrada(titulo, autor)) {
        livros = BibliotecaLivros.buscarLivro(titulo, autor);
        if (livros) {
            if (verificarAutorTitulo(titulo, autor)) {
                for (let i = 0; i < livros.length; i++) {
                    let livro = BibliotecaLivros.emprestarLivro(livros[i]);
                    if (livro == true) {
                        mostrarMensagem('Livro ' + titulo + ' alugado com sucesso');
                    }
                    else {
                        mostrarMensagem('Detectamos um problema ao alugar o Livro ' + titulo + " ,Este livro ja deve ter sido alugado!");
                    }
                }
            }
            else {
                mostrarMensagem('Livro não encontrado, porfavor informar titulo e autor(a).');
            }
        }
        else {
            mostrarMensagem('Livro ' + titulo + ' não encontrado.');
        }
    }
}
export function botaoDevolvClicado() {
    let titulo = document.getElementById('titulo').value;
    let autor = document.getElementById('autor').value;
    let livros;
    if (verificarEntrada(titulo, autor)) {
        livros = BibliotecaLivros.buscarLivro(titulo, autor);
        if (livros) {
            if (verificarAutorTitulo(titulo, autor)) {
                for (let i = 0; i < livros.length; i++) {
                    let livro = BibliotecaLivros.receberLivro(livros[i]);
                    if (livro == true) {
                        mostrarMensagem('Livro ' + titulo + ' devolvido com sucesso');
                    }
                    else {
                        mostrarMensagem('Detectamos um problema ao devolver o Livro ' + titulo + " esse livro não foi alugado");
                    }
                }
            }
            else {
                mostrarMensagem('Livro não encontrado, porfavor informar titulo e autor(a).');
            }
        }
        else {
            mostrarMensagem('Livro não encontrado.');
        }
    }
}
function converterLivrosParaLi(livros) {
    let novoLi = document.createElement('li');
    novoLi.innerHTML = 'Titulo: ' + livros.titulo + '<br> Autor: ' + livros.autor + '<br>Categoria: ' + livros.categoria + ' <br> Disponivel: ' + livros.disponivel + '<br>';
    return novoLi;
}
function mostrarMensagem(mensagem) {
    let resultadoDiv = document.getElementById('resultado');
    if (resultadoDiv) {
        resultadoDiv.innerHTML = mensagem;
    }
}
