export class Livro{
    titulo:string;
    autor: string;
    categoria: string;
    disponivel: boolean;
    data_publicacao: Date;


    constructor(data_publicacao:Date,titulo:string,autor:string,categoria:string){
        this.titulo = titulo;
        this.autor = autor;
        this.categoria = categoria;
        this.data_publicacao = data_publicacao;
        this.disponivel = true;
    }   
}
