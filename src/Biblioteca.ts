// Importa a classe Livro do módulo Livro.js
import { Livro } from "./Livro.js";
// Importa a classe Alugados do módulo Alugados.js
import { Alugados } from "./Alugados.js";

// Define a classe Biblioteca
export class Biblioteca {
    // Declara um array de livros e um array de livros alugados
    livros: Livro[];
    alugados: Alugados[];

    // Construtor da classe Biblioteca
    constructor() {
        // Inicializa o array de livros e o array de alugados como arrays vazios
        this.livros = [];
        this.alugados = [];
    }

    // Método para cadastrar um novo livro na biblioteca
    cadastrarLivro(titulo: string, autor: string, categoria: string) {
        // Cria uma nova instância da classe Livro
        let novoLivro = new Livro(titulo, autor, categoria);
        // Adiciona o novo livro ao array de livros
        this.livros.push(novoLivro);
        // Retorna true indicando que o livro foi cadastrado com sucesso
        return true;
    }

    // Método para remover um livro da biblioteca
    removerLivro(titulo: string, autor: string): boolean {
        // Declara uma variável para armazenar a posição dos livros encontrados
        let posicao: number[] | undefined;
        // Declara uma variável para uso no loop
        let i: number;
        // Obtém a posição dos livros que correspondem ao título e autor fornecidos
        posicao = this.buscarPosicaoLivroPorTituloAutor(titulo, autor);
        // Verifica se a posição não é indefinida
        if (posicao != undefined) {
            // Itera sobre todas as posições encontradas
            for (i = 0; i < posicao.length; i++) {
                // Exibe o livro encontrado no console para depuração
                console.log(this.livros[posicao[i]]);
                // Verifica se o livro está disponível
                if (this.livros[posicao[i]].disponivel == true) {
                    // Remove o livro do array de livros
                    this.livros.splice(posicao[i], 1);
                } else {
                    // Retorna false se o livro não estiver disponível
                    return false;
                }
            }
            // Retorna true indicando que o livro foi removido com sucesso
            return true;
        } else {
            // Retorna false se a posição for indefinida
            return false;
        }
    }

    // Método para buscar a posição dos livros com base no título e autor
    buscarPosicaoLivroPorTituloAutor(titulo: string, autor: string): number[] | undefined {
        // Declara um array para armazenar as posições dos livros encontrados
        let livrosEncontrados: number[] = [];
        // Declara uma variável para uso no loop
        let i: number;
        // Verifica se o título ou autor não estão vazios
        if (titulo != "" || autor != "") {
            // Itera sobre todos os livros
            for (i = 0; i < this.livros.length; i++) {
                // Verifica se ambos título e autor são fornecidos
                if (titulo && autor) {
                    // Exibe o título e o autor no console para depuração
                    console.log(titulo, autor);
                    // Verifica se o livro corresponde ao título e autor fornecidos
                    if (this.livros[i].titulo.toLowerCase().includes(titulo.toLowerCase().trim()) &&
                        this.livros[i].autor.toLowerCase().includes(autor.toLowerCase().trim())) {
                        // Adiciona a posição do livro ao array de livros encontrados
                        livrosEncontrados.push(i);
                    }
                } else if (titulo || autor) {
                    // Exibe o autor e o título no console para depuração
                    console.log(autor, titulo);
                    // Verifica se o livro corresponde ao título ou autor fornecidos
                    if (this.livros[i].titulo.toLowerCase().includes(titulo.toLowerCase().trim()) &&
                        this.livros[i].autor.toLowerCase().includes(autor.toLowerCase().trim())) {
                        // Adiciona a posição do livro ao array de livros encontrados
                        livrosEncontrados.push(i);
                    }
                } else {
                    // Retorna indefinido se nenhum título ou autor for fornecido
                    return undefined;
                }
            }
            // Exibe as posições encontradas no console para depuração
            console.log(livrosEncontrados);
            // Retorna as posições dos livros encontrados
            return livrosEncontrados;
        } else {
            // Retorna indefinido se o título e o autor forem vazios
            return undefined;
        }
    }

    // Método para buscar livros com base em título, autor, categoria e disponibilidade
    buscarPosicaoLivro(titulo: string, autor: string, categoria: string, disponivel: boolean) {
        // Declara arrays para armazenar posições e livros encontrados
        let posicao: number[] = [];
        let livrosEncontrados: number[] = [];
        // Declara uma variável para uso no loop
        let i: number;
        // Verifica se a categoria e a disponibilidade são fornecidas
        if (categoria != "" && disponivel != true || disponivel != false) {
            // Obtém a posição dos livros com base no título e autor
            posicao = this.buscarPosicaoLivroPorTituloAutor(titulo, autor);
            // Verifica se a posição é indefinida
            if (posicao === undefined) {
                // Verifica se o título e o autor estão vazios
                if (titulo == "" && autor == "") {
                    // Itera sobre todos os livros
                    for (i = 0; i < this.livros.length; i++) {
                        // Verifica se o livro corresponde à categoria e disponibilidade fornecidas
                        if (this.livros[i].categoria == categoria && this.livros[i].disponivel == disponivel) {
                            // Adiciona a posição do livro ao array de livros encontrados
                            livrosEncontrados.push(i);
                        }
                    }
                    // Retorna as posições dos livros encontrados
                    return livrosEncontrados;
                }
            }
            // Declara uma variável para armazenar o comprimento da posição encontrada
            let posicao1 = posicao.length;
            // Itera sobre as posições encontradas
            for (i = 0; i < posicao1; i++) {
                // Verifica se o livro corresponde à categoria e disponibilidade fornecidas
                if (this.livros[posicao[i]].categoria == categoria && this.livros[posicao[i]].disponivel == disponivel) {
                    // Adiciona a posição do livro ao array de livros encontrados
                    livrosEncontrados.push(posicao[i]);
                }
            }
            // Verifica se nenhum livro foi encontrado
            if (livrosEncontrados.length == 0) {
                // Retorna indefinido se nenhum livro for encontrado
                return undefined;
            }
        }
        // Retorna as posições dos livros encontrados
        return livrosEncontrados;
    }

    // Método para filtrar livros com base em título, autor, categoria e disponibilidade
    filterLivro(titulo: string, autor: string, categoria: string, disponivel: boolean) {
        // Declara um array para armazenar livros encontrados
        let livrosEncontrados: Livro[] = [];
        // Declara uma variável para armazenar a posição dos livros encontrados
        let posicao: number[] | undefined;
        // Declara uma variável para uso no loop
        let i: number;
        // Obtém a posição dos livros com base nos critérios fornecidos
        posicao = this.buscarPosicaoLivro(titulo, autor, categoria, disponivel);
        // Verifica se a posição não é indefinida
        if (posicao != undefined) {
            // Itera sobre as posições encontradas
            for (i = 0; i < posicao.length; i++) {
                // Adiciona o livro encontrado ao array de livros encontrados
                livrosEncontrados.push(this.livros[posicao[i]]);
            }
            // Retorna os livros encontrados
            return livrosEncontrados;
        } else if (livrosEncontrados) {
            // Retorna indefinido se nenhum livro for encontrado
            return undefined;
        }
    }

    // Método para buscar livros com base em título e autor
    buscarLivro(titulo: string, autor: string) {
        // Declara um array para armazenar livros encontrados
        let livrosEncontrados: Livro[] = [];
        // Declara uma variável para armazenar a posição dos livros encontrados
        let posicao: number[] | undefined;
        // Declara uma variável para uso no loop
        let i: number;
        // Obtém a posição dos livros com base no título e autor fornecidos
        posicao = this.buscarPosicaoLivroPorTituloAutor(titulo, autor);
        // Verifica se a posição não é indefinida
        if (posicao != undefined) {
            // Itera sobre as posições encontradas
            for (i = 0; i < posicao.length; i++) {
                // Adiciona o livro encontrado ao array de livros encontrados
                livrosEncontrados.push(this.livros[posicao[i]]);
            }
            // Retorna os livros encontrados
            return livrosEncontrados;
        } else if (livrosEncontrados) {
            // Retorna indefinido se nenhum livro for encontrado
            return undefined;
        }
    }

    // Método para listar todos os livros da biblioteca
    listarLivro() {
        // Retorna o array de todos os livros
        return this.livros;
    }

    // Método para alugar um livro
    alugarLivro(nomeAluno: string, matricula: string, titulo: string, autor: string, dataEntrega: Date): boolean {
        // Itera sobre todos os livros
        for (let i = 0; i < this.livros.length; i++) {
            let livro = this.livros[i];
            // Verifica se o livro corresponde ao título, autor e se está disponível
            if (livro.titulo === titulo && livro.autor === autor && livro.disponivel) {
                // Marca o livro como não disponível
                livro.disponivel = false;
                // Cria uma nova instância da classe Alugados para o empréstimo
                let novoEmprestimo = new Alugados(nomeAluno, matricula, dataEntrega, titulo, autor);
                // Adiciona o empréstimo ao array de livros alugados
                this.alugados.push(novoEmprestimo);
                // Retorna true indicando que o livro foi alugado com sucesso
                return true;
            }
        }
        // Retorna false se o livro não puder ser alugado
        return false;
    }

    // Método para receber um livro de volta
    receberLivro(titulo: string, autor: string, nomeAluno: string, matricula: string): boolean {
        // Itera sobre todos os livros
        for (let i = 0; i < this.livros.length; i++) {
            let livro = this.livros[i];
            // Verifica se o livro corresponde ao título, autor e se não está disponível
            if (livro.titulo === titulo && livro.autor === autor && !livro.disponivel) {
                // Marca o livro como disponível
                livro.disponivel = true;
                // Itera sobre todos os empréstimos
                for (let i = 0; i < this.alugados.length; i++) {
                    let alugado = this.alugados[i];
                    // Verifica se o empréstimo corresponde ao livro e aluno fornecidos
                    if (alugado.tituloLivro === titulo && alugado.autorLivro === autor &&
                        alugado.nomeAluno == nomeAluno && alugado.matricula == matricula) {
                        // Remove o empréstimo do array de livros alugados
                        this.alugados.splice(i, 1);
                    }
                }
                // Retorna true indicando que o livro foi recebido com sucesso
                return true;
            }
        }
        // Retorna false se o livro não puder ser recebido
        return false;
    }
}

// Cria uma instância da classe Biblioteca e exporta-a como BibliotecaLivros
export let BibliotecaLivros = new Biblioteca();
