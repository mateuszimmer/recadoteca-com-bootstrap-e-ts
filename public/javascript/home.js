"use strict";
const modalRecados = new bootstrap.Modal('#modalRecados');
document.addEventListener('DOMContentLoaded', () => {
    if (!(localStorage.getItem('usuarioLogado'))) {
        location.assign('index.html');
    }
});
// ------ Modo Dark ------
const modoD = localStorage.getItem('dark') || "";
if (modoD === 'true') {
    document.body.classList.add('dark-theme');
    localStorage.setItem('dark', 'true');
}
else {
    document.body.classList.remove('dark-theme');
    localStorage.setItem('dark', 'false');
}
const darkModeH = document.querySelector("#toggleButton");
darkModeH.addEventListener("click", () => {
    // document.body.classList.toggle('dark-theme');
    const modo = localStorage.getItem('dark') || "";
    if (modo === 'false') {
        document.body.classList.add('dark-theme');
        localStorage.setItem('dark', 'true');
    }
    else {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('dark', 'false');
    }
});
//---------- Carregar nome do Usuário no HTML -----------
carregarNomeDoUsuarioNoHTML();
function carregarNomeDoUsuarioNoHTML() {
    const usuarioLogado = buscarUsuarioLogadonoLocalStorage();
    const nomeDoUsuarioNoHTML = document.querySelector('#nomeDoUsuario');
    nomeDoUsuarioNoHTML.innerText = `${usuarioLogado.usuario}`;
}
//---------- Buscar Usuário Logado no localStorage -------
function buscarUsuarioLogadonoLocalStorage() {
    return JSON.parse(localStorage.getItem('usuarioLogado') || '[]');
}
//----------- Abrir Modal --------------
carregaBotoesParaAbrirModal();
function carregaBotoesParaAbrirModal() {
    const botoesModalHTML = document.querySelectorAll('.btnAbrirModal');
    botoesModalHTML.forEach((botao) => {
        botao.addEventListener('click', () => {
            modalRecados.toggle();
            const identificarOQueFazer = botao.getAttribute('data-bs-whatever');
            const tituloDoModalHTML = document.querySelector('#tituloDoModal');
            tituloDoModalHTML.innerText = `${identificarOQueFazer}`;
        });
    });
}
//------------- Salvar recado ---------------
const formularioCadastroRecadosHTML = document.querySelector('#formularioCadastroRecados');
formularioCadastroRecadosHTML.addEventListener('submit', (e) => {
    e.preventDefault();
    salvarRecado();
    modalRecados.toggle();
});
function salvarRecado() {
    const inputHiddenHTML = document.querySelector('#inputPosicaoArray');
    const inputTituloRecadoHTML = document.querySelector('#inputTituloRecado');
    const inputDescricaoRecadoHTML = document.querySelector('#inputDescricaoRecado');
    const usuarioLogado = buscarUsuarioLogadonoLocalStorage();
    const recadoParaSalvar = {
        titulo: inputTituloRecadoHTML.value,
        descricao: inputDescricaoRecadoHTML.value
    };
    if (inputHiddenHTML.value !== '') {
        const valorInputHidden = Number(inputHiddenHTML.value);
        usuarioLogado.recados[valorInputHidden] = recadoParaSalvar;
    }
    else {
        usuarioLogado.recados.push(recadoParaSalvar);
    }
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
    salvaOUsuarioNaListaDeUsuarios(usuarioLogado);
    imprimeRecadosAtualizados();
    inputHiddenHTML.value = '';
    inputTituloRecadoHTML.value = '';
    inputDescricaoRecadoHTML.value = '';
}
function salvaOUsuarioNaListaDeUsuarios(usuarioLogado) {
    const arrayDeUsuarios = JSON.parse(localStorage.getItem('usuariosLocalStorage') || "[]");
    const indexUsuarioLogado = Number(localStorage.getItem('indiceUsuarioLogado'));
    arrayDeUsuarios[indexUsuarioLogado] = usuarioLogado;
    localStorage.setItem('usuariosLocalStorage', JSON.stringify(arrayDeUsuarios));
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
}
//------------ Imprime Recados Atualizados ---------
imprimeRecadosAtualizados();
function imprimeRecadosAtualizados() {
    const listaDeRecados = JSON.parse(localStorage.getItem('usuarioLogado') || '[]').recados;
    const localDosRecados = document.querySelector('#recados');
    localDosRecados.innerHTML = '';
    listaDeRecados.forEach((recado, indice) => {
        const recados = document.getElementById('recados');
        const tr = document.createElement('tr');
        adicionaClasses(tr, ['text-center']);
        const indiceTr = criarColuna(JSON.stringify(indice));
        const tituloTd = criarColuna(recado.titulo);
        const descricaoTd = criarColuna(recado.descricao);
        const acoesTd = criarColuna('');
        const btnEditar = document.createElement('button');
        adicionaClasses(btnEditar, ["btn", "btnDark", "btn-outline-secondary", "btnAbrirModal", "me-1"]);
        btnEditar.innerHTML = 'Editar';
        btnEditar.setAttribute('data-bs-whatever', `Editando o Recado ${indice}`);
        btnEditar.setAttribute('id', `botaoEditarIndice${indice}`);
        btnEditar.addEventListener('click', (e) => {
            editarRecado(indice);
        });
        const btnApagar = document.createElement('button');
        adicionaClasses(btnApagar, ["btn", "btn-outline-danger",]);
        btnApagar.innerHTML = 'Apagar';
        btnApagar.addEventListener('click', (e) => {
            apagarRecado(indice);
        });
        acoesTd.appendChild(btnEditar);
        acoesTd.appendChild(btnApagar);
        tr.appendChild(indiceTr);
        tr.appendChild(tituloTd);
        tr.appendChild(descricaoTd);
        tr.appendChild(acoesTd);
        recados.appendChild(tr);
        carregaBotoesParaAbrirModal();
    });
}
function criarColuna(texto) {
    const coluna = document.createElement('td');
    coluna.innerText = texto;
    return coluna;
}
function adicionaClasses(elemento, classes) {
    for (const classe of classes) {
        elemento.classList.add(classe);
    }
}
//--------------- Editar Recado -----------------
function editarRecado(indice) {
    const inputHiddenHTML = document.querySelector('#inputPosicaoArray');
    const inputTituloRecadoHTML = document.querySelector('#inputTituloRecado');
    const inputDescricaoRecadoHTML = document.querySelector('#inputDescricaoRecado');
    const usuarioLogado = buscarUsuarioLogadonoLocalStorage();
    modalRecados.toggle();
    inputHiddenHTML.value = `${indice}`;
    inputTituloRecadoHTML.value = usuarioLogado.recados[indice].titulo;
    inputDescricaoRecadoHTML.value = usuarioLogado.recados[indice].descricao;
}
//--------------- Apagar Recado ------------------
function apagarRecado(indice) {
    const usuarioLogado = buscarUsuarioLogadonoLocalStorage();
    usuarioLogado.recados.splice(indice, 1);
    console.log(usuarioLogado);
    salvaOUsuarioNaListaDeUsuarios(usuarioLogado);
    imprimeRecadosAtualizados();
}
//--------- Fechar Modal -------
const botaoFecharModalHomeHTML = document.querySelectorAll('.botaoFecharModal');
botaoFecharModalHomeHTML.forEach((e) => {
    e.addEventListener('click', () => {
        const inputHiddenHTML = document.querySelector('#inputPosicaoArray');
        const inputTituloRecadoHTML = document.querySelector('#inputTituloRecado');
        const inputDescricaoRecadoHTML = document.querySelector('#inputDescricaoRecado');
        inputHiddenHTML.value = '';
        inputTituloRecadoHTML.value = '';
        inputDescricaoRecadoHTML.value = '';
    });
});
// ------ Botão Sair ------
const btnSair = document.getElementById('btnSair');
btnSair.addEventListener('click', sair);
function sair() {
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('indiceUsuarioLogado');
    window.location.href = 'index.html';
}
