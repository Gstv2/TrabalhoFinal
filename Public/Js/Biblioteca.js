import { Livro } from "./Livro.js";
export class Biblioteca {
    constructor() {
        this.livros = [];
    }
    cadastrarLivro(titulo, autor, categoria) {
        let novoLivro = new Livro(titulo, autor, categoria);
        this.livros.push(novoLivro);
    }
    removerLivro(titulo, autor, categoria) {
        let posicao;
        let i;
        posicao = this.buscarPosicaoLivro(titulo, autor, categoria);
        if (posicao != undefined) {
            for (i = 0; i < posicao.length; i++) {
                console.log(this.livros[posicao[i]]);
                this.livros.splice(posicao[i], 1);
            }
            return true;
        }
        else {
            return false;
        }
    }
    buscarPosicaoLivro(titulo, autor, categoria) {
        let livrosEncontrados = [];
        let i;
        for (i = 0; i < this.livros.length; i++) {
            if (titulo && autor && categoria) {
                console.log(titulo, autor);
                if (this.livros[i].titulo.toLowerCase().includes(titulo.toLowerCase().trim()) && this.livros[i].autor.toLowerCase().includes(autor.toLowerCase().trim()) && this.livros[i].categoria.toLowerCase().includes(categoria.toLowerCase().trim())) {
                    livrosEncontrados.push(i);
                }
            }
            else if (titulo || autor || categoria) {
                console.log(autor, titulo);
                if (this.livros[i].titulo.toLowerCase().includes(titulo.toLowerCase().trim()) && this.livros[i].autor.toLowerCase().includes(autor.toLowerCase().trim()) && this.livros[i].categoria.toLowerCase().includes(categoria.toLowerCase().trim())) {
                    livrosEncontrados.push(i);
                }
            }
            else {
                return undefined;
            }
        }
        if (livrosEncontrados.length == 0) {
            return undefined;
        }
        return livrosEncontrados;
    }
    buscarLivro(titulo, autor, categoria) {
        let livrosEncontrados = [];
        let posicao;
        let i;
        posicao = this.buscarPosicaoLivro(titulo, autor, categoria);
        if (posicao != undefined) {
            for (i = 0; i < posicao.length; i++) {
                livrosEncontrados.push(this.livros[posicao[i]]);
            }
            return livrosEncontrados;
        }
        else if (livrosEncontrados) {
            return undefined;
        }
    }
    listarLivro() {
        return this.livros;
    }
    emprestarLivro(livro) {
        if (livro.disponivel == false || undefined) {
            return false;
        }
        else {
            livro.disponivel = false;
        }
        return true;
    }
    receberLivro(livro) {
        if (livro.disponivel == true || undefined) {
            return false;
        }
        else {
            livro.disponivel = true;
        }
        return true;
    }
}
export let BibliotecaLivros = new Biblioteca();
