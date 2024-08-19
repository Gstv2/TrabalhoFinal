import { Livro } from "./Livro.js";

export class Biblioteca{
    livros: Livro[];

    constructor(){
        this.livros = [];
    }

    cadastrarLivro(data_publicacao:Date,titulo:string,autor:string,categoria:string){
        let novoLivro = new Livro(data_publicacao,titulo,autor,categoria);
        this.livros.push(novoLivro);
    }

    removerLivro(titulo:string):boolean{
        let posicao : number | undefined;
        posicao = this.buscarPosicaoLivro(titulo);
        if(posicao!=undefined){
            this.livros.splice(posicao,1);
            return true;
        }else{
            return false;
        }
    }


    buscarPosicaoLivro(titulo:string){
        let i:number;
        for(i=0;i<this.livros.length;i++){
            if(titulo == this.livros[i].titulo){
                return i;
            }
        }
        return undefined;
    }


    buscarLivro(titulo:string){
        let posicao : number | undefined;
        posicao = this.buscarPosicaoLivro(titulo);
        if(posicao!=undefined){
            return this.livros[posicao];
        }else{
            return undefined;
        }
    }

    listarLivro(){
        return this.livros;
    }


}

export let BibliotecaLivros = new Biblioteca();

cadastrarLivros();
function cadastrarLivros(){
    BibliotecaLivros.cadastrarLivro(new Date(1954, 6, 29), "O Senhor dos Anéis", "J.R.R. Tolkien", "Fantasia");
    BibliotecaLivros.cadastrarLivro(new Date(1949, 5, 8), "1984", "George Orwell", "Distopia");
    BibliotecaLivros.cadastrarLivro(new Date(1605, 0, 16), "Dom Quixote", "Miguel de Cervantes", "Clássico");
    BibliotecaLivros.cadastrarLivro(new Date(1997, 5, 26), "Harry Potter e a Pedra Filosofal", "J.K. Rowling", "Fantasia");
    BibliotecaLivros.cadastrarLivro(new Date(1813, 0, 28), "Orgulho e Preconceito", "Jane Austen", "Romance");
    BibliotecaLivros.cadastrarLivro(new Date(1951, 6, 16), "O Apanhador no Campo de Centeio", "J.D. Salinger", "Ficção");
    BibliotecaLivros.cadastrarLivro(new Date(1847, 9, 16), "Jane Eyre", "Charlotte Brontë", "Romance");
    BibliotecaLivros.cadastrarLivro(new Date(1869, 2, 23), "Guerra e Paz", "Liev Tolstói", "Clássico");
    BibliotecaLivros.cadastrarLivro(new Date(1960, 6, 11), "O Sol é para Todos", "Harper Lee", "Ficção");
    BibliotecaLivros.cadastrarLivro(new Date(1937, 8, 21), "O Hobbit", "J.R.R. Tolkien", "Fantasia");
}
