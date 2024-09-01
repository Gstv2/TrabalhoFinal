import { cadastrarLivros } from './CadastrarLivros.js';
import { botaoAddClicado, botaoRemoveClicado, botaoSearchClicado, botaoListClicado, botaoEmprestClicado, botaoDevolvClicado } from './FunçõesBiblioteca.js';

let buttonList = document.getElementById('BotãoListar');
let buttonAdd = document.getElementById('adicionar');
let buttonRemove = document.getElementById('remover');
let buttonSearch = document.getElementById('buscar');
let buttonEmprest = document.getElementById('alugar');
let buttonDevolv = document.getElementById('devolver');

cadastrarLivros();

buttonAdd.onclick = botaoAddClicado;
buttonRemove.onclick = botaoRemoveClicado;
buttonSearch.onclick = botaoSearchClicado;
buttonList.onclick = botaoListClicado;
buttonEmprest.onclick = botaoEmprestClicado;
buttonDevolv.onclick = botaoDevolvClicado;