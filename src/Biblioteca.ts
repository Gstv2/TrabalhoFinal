import { Livro } from "./Livro.js";

export class Biblioteca{
    livros: Livro[];

    constructor(){
        this.livros = [];
    }
    cadastrarLivro(titulo:string,autor:string,categoria:string){
        let novoLivro = new Livro(titulo,autor,categoria);
        this.livros.push(novoLivro);
        return true;
    }


    removerLivro(titulo:string,autor:string):boolean{
        let posicao : number[] | undefined;
        let i:number;
        posicao = this.buscarPosicaoLivroPorTituloAutor(titulo,autor);
        if(posicao!=undefined){
            for(i=0;i<posicao.length;i++){
                console.log(this.livros[posicao[i]]);
                if(this.livros[posicao[i]].disponivel == true){
                    this.livros.splice(posicao[i],1);
                }else{
                    return false;
                }
            }   
            return true;
        }else{
            return false;
        }
    }

    buscarPosicaoLivroPorTituloAutor(titulo:string,autor:string):number[] | undefined{
        let livrosEncontrados: number[] = [];
        let i:number;
        if(titulo != "" || autor != ""){
            for(i=0;i<this.livros.length;i++){
                if(titulo && autor){
                    console.log(titulo,autor);
                    if(this.livros[i].titulo.toLowerCase().includes(titulo.toLowerCase().trim()) && this.livros[i].autor.toLowerCase().includes(autor.toLowerCase().trim())){
                        livrosEncontrados.push(i);
                    }
                }else if(titulo || autor){
                    console.log(autor,titulo);
                    if(this.livros[i].titulo.toLowerCase().includes(titulo.toLowerCase().trim()) && this.livros[i].autor.toLowerCase().includes(autor.toLowerCase().trim())){
                        livrosEncontrados.push(i);
                    }
                }else{
                    return undefined;
                }
            }
            console.log(livrosEncontrados);
            return livrosEncontrados;
        }else{
            return undefined;
        }
    }


    buscarPosicaoLivro(titulo:string,autor:string,categoria:string,disponivel:boolean){
        let posicao: number[] = [];
        let livrosEncontrados: number[] = [];
        let i:number;
        if(categoria != "" && disponivel != true || disponivel != false){
            posicao = this.buscarPosicaoLivroPorTituloAutor(titulo,autor);
            if(posicao === undefined){
                if(titulo == "" && autor == ""){
                    for(i = 0;i<this.livros.length;i++){
                        if(this.livros[i].categoria == categoria && this.livros[i].disponivel == disponivel){
                            livrosEncontrados.push(i);
                        }
                    }
                    return livrosEncontrados;
                }
            }
            let posicao1 = posicao.length;
            for(i = 0;i<posicao1;i++){
                if(this.livros[posicao[i]].categoria == categoria && this.livros[posicao[i]].disponivel == disponivel){
                    livrosEncontrados.push(posicao[i]);
                }
            }
            if(livrosEncontrados.length == 0){
                return undefined;
            }
        }
        return livrosEncontrados;
    }

    filterLivro(titulo:string,autor:string,categoria:string,disponivel:boolean){
        let livrosEncontrados: Livro[] = [];
        let posicao : number[] | undefined;
        let i:number;
        posicao = this.buscarPosicaoLivro(titulo,autor,categoria,disponivel);
        if(posicao!=undefined){
            for(i=0;i<posicao.length;i++){
                livrosEncontrados.push(this.livros[posicao[i]]);
            }
            return livrosEncontrados;
        }else if(livrosEncontrados){
            return undefined;
        }
    }


    buscarLivro(titulo:string,autor:string){
        let livrosEncontrados: Livro[] = [];
        let posicao : number[] | undefined;
        let i:number;
        posicao = this.buscarPosicaoLivroPorTituloAutor(titulo,autor);
        if(posicao!=undefined){
            for(i=0;i<posicao.length;i++){
                livrosEncontrados.push(this.livros[posicao[i]]);
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
        return true;
    }

}
export let BibliotecaLivros = new Biblioteca();