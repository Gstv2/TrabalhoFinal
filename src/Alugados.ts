export class Alugados {
    nomeAluno: string;
    matricula: string;
    dataEntrega: Date;
    tituloLivro: string;
    autorLivro: string;

    constructor(nomeAluno: string, matricula: string, dataEntrega: Date, tituloLivro: string, autorLivro: string) {
        this.nomeAluno = nomeAluno;
        this.matricula = matricula;
        this.dataEntrega = dataEntrega;
        this.tituloLivro = tituloLivro;
        this.autorLivro = autorLivro;
    }
}
