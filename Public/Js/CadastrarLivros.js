"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cadastrarLivros = cadastrarLivros;
const Biblioteca_js_1 = require("./Biblioteca.js");
function cadastrarLivros() {
    Biblioteca_js_1.BibliotecaLivros.cadastrarLivro(new Date(1954, 6, 29), "O Senhor dos Anéis", "J.R.R. Tolkien", "Fantasia");
    Biblioteca_js_1.BibliotecaLivros.cadastrarLivro(new Date(1949, 5, 8), "1984", "George Orwell", "Distopia");
    Biblioteca_js_1.BibliotecaLivros.cadastrarLivro(new Date(1605, 0, 16), "Dom Quixote", "Miguel de Cervantes", "Clássico");
    Biblioteca_js_1.BibliotecaLivros.cadastrarLivro(new Date(1997, 5, 26), "Harry Potter e a Pedra Filosofal", "J.K. Rowling", "Fantasia");
    Biblioteca_js_1.BibliotecaLivros.cadastrarLivro(new Date(1813, 0, 28), "Orgulho e Preconceito", "Jane Austen", "Romance");
    Biblioteca_js_1.BibliotecaLivros.cadastrarLivro(new Date(1951, 6, 16), "O Apanhador no Campo de Centeio", "J.D. Salinger", "Ficção");
    Biblioteca_js_1.BibliotecaLivros.cadastrarLivro(new Date(1847, 9, 16), "Jane Eyre", "Charlotte Brontë", "Romance");
    Biblioteca_js_1.BibliotecaLivros.cadastrarLivro(new Date(1869, 2, 23), "Guerra e Paz", "Liev Tolstói", "Clássico");
    Biblioteca_js_1.BibliotecaLivros.cadastrarLivro(new Date(1960, 6, 11), "O Sol é para Todos", "Harper Lee", "Ficção");
    Biblioteca_js_1.BibliotecaLivros.cadastrarLivro(new Date(1937, 8, 21), "O Hobbit", "J.R.R. Tolkien", "Fantasia");
}
