import { cadastrarLivros } from './CadastrarLivros.js';
import { botaoAddClicado, botaoRemoveClicado, botaoSearchClicado, botaoListClicado } from './ListarLivro.js';
let buttonList = document.getElementById('BotãoListar');
let buttonAdd = document.getElementById('adicionar');
let buttonRemove = document.getElementById('remover');
let buttonSearch = document.getElementById('buscar');
cadastrarLivros();
buttonAdd.onclick = botaoAddClicado;
buttonRemove.onclick = botaoRemoveClicado;
buttonSearch.onclick = botaoSearchClicado;
buttonList.onclick = botaoListClicado;
