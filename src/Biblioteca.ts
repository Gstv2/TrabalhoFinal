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