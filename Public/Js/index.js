import { cadastrarLivros } from './CadastrarLivros.js';
import { botaoClicado } from './ListarLivro.js';
let buttonList = document.getElementById('BotãoListar');
let lista = document.getElementById('resultado');
cadastrarLivros();
buttonList.onclick = botaoClicado;
