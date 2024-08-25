import { cadastrarLivros } from './CadastrarLivros.js';
import { botaoAddClicado, botaoRemoveClicado, botaoSearchClicado, botaoListClicado } from './ListarLivro.js';


let buttonList : HTMLElement = document.getElementById('BotãoListar');
let buttonAdd : HTMLElement = document.getElementById('adicionar');
let buttonRemove : HTMLElement = document.getElementById('remover');
let buttonSearch : HTMLElement = document.getElementById('buscar');


cadastrarLivros();
buttonAdd.onclick = botaoAddClicado;
buttonRemove.onclick = botaoRemoveClicado;
buttonSearch.onclick = botaoSearchClicado;
buttonList.onclick = botaoListClicado;