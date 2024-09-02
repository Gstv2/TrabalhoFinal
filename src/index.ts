import { cadastrarLivros } from './CadastrarLivros.js';
import { botaoAddClicado } from './FunçõesBiblioteca.js';
import { botaoRemoveClicado } from './FunçõesBiblioteca.js'
import { botaoSearchClicado } from './FunçõesBiblioteca.js'
import { botaoListClicado } from './FunçõesBiblioteca.js'
import { botaoEmprestClicado } from './FunçõesBiblioteca.js'
import { botaoDevolvClicado } from './FunçõesBiblioteca.js'
import { botaoFilterClick } from './FunçõesBiblioteca.js'



cadastrarLivros();


let buttonList: HTMLElement | null = document.getElementById('BotãoListar');
let buttonAdd: HTMLElement | null = document.getElementById('adicionar');
let buttonRemove: HTMLElement | null = document.getElementById('remover');
let buttonSearch: HTMLElement | null = document.getElementById('buscar');
let buttonEmprest: HTMLElement | null = document.getElementById('alugar');
let buttonDevolv: HTMLElement | null = document.getElementById('devolver');
let buttonfiltrar: HTMLElement | null = document.getElementById('filtrar');

buttonAdd.onclick = botaoAddClicado;
buttonRemove.onclick = botaoRemoveClicado;
buttonSearch.onclick = botaoSearchClicado;
buttonList.onclick = botaoListClicado;
buttonEmprest.onclick = botaoEmprestClicado;
buttonDevolv.onclick = botaoDevolvClicado;
buttonfiltrar.onclick = botaoFilterClick;