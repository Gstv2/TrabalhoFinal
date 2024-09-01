import { Livro } from "./Livro.js";

export class Biblioteca{
    livros: Livro[];

    constructor(){
        this.livros = [];
    }
    cadastrarLivro(titulo:string,autor:string,categoria:string){
        let novoLivro = new Livro(titulo,autor,categoria);
        this.livros.push(novoLivro);
    }
    removerLivro(titulo:string,autor:string,categoria:string):boolean{
        let posicao : number[] | undefined;
        let i:number;
        posicao = this.buscarPosicaoLivro(titulo,autor,categoria);
        if(posicao!=undefined){
            for(i=0;i<posicao.length;i++){
                console.log(this.livros[posicao[i]]);
                this.livros.splice(posicao[i],1);
            }   
            return true;
        }else{
            return false;
        }
    }

    buscarPosicaoLivro(titulo:string,autor:string,categoria:string){
        let livrosEncontrados: number[] = [];
        let i:number;
        for(i=0;i<this.livros.length;i++){
            if(titulo && autor && categoria){
                console.log(titulo,autor);
                if(this.livros[i].titulo.toLowerCase().includes(titulo.toLowerCase().trim()) && this.livros[i].autor.toLowerCase().includes(autor.toLowerCase().trim()) && this.livros[i].categoria.toLowerCase().includes(categoria.toLowerCase().trim())){
                    livrosEncontrados.push(i);
                }
            }else if(titulo || autor || categoria){
                console.log(autor,titulo);
                if(this.livros[i].titulo.toLowerCase().includes(titulo.toLowerCase().trim()) && this.livros[i].autor.toLowerCase().includes(autor.toLowerCase().trim()) && this.livros[i].categoria.toLowerCase().includes(categoria.toLowerCase().trim())){
                    livrosEncontrados.push(i);
                }
            }else{
                return undefined;
            }
        }
        if(livrosEncontrados.length == 0){
            return undefined;
        }
        return livrosEncontrados;
    }

    buscarLivro(titulo:string,autor:string,categoria:string){
        let livrosEncontrados: Livro[] = [];
        let posicao : number[] | undefined;
        let i:number;
        posicao = this.buscarPosicaoLivro(titulo,autor,categoria);
        if(posicao!=undefined){
            for(i=0;i<posicao.length;i++){
                livrosEncontrados.push(this.livros[posicao[i]])
            }
            return livrosEncontrados;
        }else if(livrosEncontrados){
            return undefined;
        }
    }

    listarLivro(){
        return this.livros;
    }

    emprestarLivro(livro:Livro): boolean {
        if(livro.disponivel == false || undefined){
            return false;
        }else{
            livro.disponivel = false;
        }
        return true;
    }

    receberLivro(livro:Livro): boolean {
        if(livro.disponivel == true || undefined){
            return false;
        }else{
            livro.disponivel = true;
        }
        return true
    }

}
export let BibliotecaLivros = new Biblioteca();