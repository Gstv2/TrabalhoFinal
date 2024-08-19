export class Livro {
    constructor(data_publicacao, titulo, autor, categoria) {
        this.titulo = titulo;
        this.autor = autor;
        this.categoria = categoria;
        this.data_publicacao = data_publicacao;
        this.disponivel = true;
    }
}
