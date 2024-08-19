import { Livro } from "./Livro.js";
import { cadastrarLivros } from "./CadastrarLivros.js";
export class Biblioteca {
    constructor() {
        this.livros = [];
    }
    cadastrarLivro(data_publicacao, titulo, autor, categoria) {
        let novoLivro = new Livro(data_publicacao, titulo, autor, categoria);
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
export let BibliotecaLivros = new Biblioteca();
cadastrarLivros();
