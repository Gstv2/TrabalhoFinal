export class Livro{
    titulo:string;
    autor: string;
    categoria: string;
    disponivel: boolean;


    constructor(titulo:string,autor:string,categoria:string){
        this.titulo = titulo;
        this.autor = autor;
        this.categoria = categoria;
        this.disponivel = true;
    }   
}
