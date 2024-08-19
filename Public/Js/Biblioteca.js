"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BibliotecaLivros = exports.Biblioteca = void 0;
const Livro_js_1 = require("./Livro.js");
class Biblioteca {
    constructor() {
        this.livros = [];
    }
    cadastrarLivro(data_publicacao, titulo, autor, categoria) {
        let novoLivro = new Livro_js_1.Livro(data_publicacao, titulo, autor, categoria);
        this.livros.push(novoLivro);
    }
    removerLivro(titulo) {
        let posicao;
        posicao = this.buscarPosicaoLivro(titulo);
        if (posicao != undefined) {
            this.livros.splice(posicao, 1);
            return true;
        }
        else {
            return false;
        }
    }
    buscarPosicaoLivro(titulo) {
        let i;
        for (i = 0; i < this.livros.length; i++) {
            if (titulo == this.livros[i].titulo) {
                return i;
            }
        }
        return undefined;
    }
    buscarLivro(titulo) {
        let posicao;
        posicao = this.buscarPosicaoLivro(titulo);
        if (posicao != undefined) {
            return this.livros[posicao];
        }
        else {
            return undefined;
        }
    }
    listarLivro() {
        return this.livros;
    }
}
exports.Biblioteca = Biblioteca;
exports.BibliotecaLivros = new Biblioteca();
cadastrarLivros();
function cadastrarLivros() {
    exports.BibliotecaLivros.cadastrarLivro(new Date(1954, 6, 29), "O Senhor dos Anéis", "J.R.R. Tolkien", "Fantasia");
    exports.BibliotecaLivros.cadastrarLivro(new Date(1949, 5, 8), "1984", "George Orwell", "Distopia");
    exports.BibliotecaLivros.cadastrarLivro(new Date(1605, 0, 16), "Dom Quixote", "Miguel de Cervantes", "Clássico");
    exports.BibliotecaLivros.cadastrarLivro(new Date(1997, 5, 26), "Harry Potter e a Pedra Filosofal", "J.K. Rowling", "Fantasia");
    exports.BibliotecaLivros.cadastrarLivro(new Date(1813, 0, 28), "Orgulho e Preconceito", "Jane Austen", "Romance");
    exports.BibliotecaLivros.cadastrarLivro(new Date(1951, 6, 16), "O Apanhador no Campo de Centeio", "J.D. Salinger", "Ficção");
    exports.BibliotecaLivros.cadastrarLivro(new Date(1847, 9, 16), "Jane Eyre", "Charlotte Brontë", "Romance");
    exports.BibliotecaLivros.cadastrarLivro(new Date(1869, 2, 23), "Guerra e Paz", "Liev Tolstói", "Clássico");
    exports.BibliotecaLivros.cadastrarLivro(new Date(1960, 6, 11), "O Sol é para Todos", "Harper Lee", "Ficção");
    exports.BibliotecaLivros.cadastrarLivro(new Date(1937, 8, 21), "O Hobbit", "J.R.R. Tolkien", "Fantasia");
}
