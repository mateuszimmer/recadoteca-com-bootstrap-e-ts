"use strict";
const myModal = new bootstrap.Modal("#modalCriarConta");
const myModalSucess = new bootstrap.Modal("#modalContaCriadaComSucesso");
const modoDar = localStorage.getItem('dark') || "";
if (modoDar === 'true') {
    document.body.classList.add('dark-theme');
    localStorage.setItem('dark', 'true');
}
else {
    document.body.classList.remove('dark-theme');
    localStorage.setItem('dark', 'false');
}
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('usuarioLogado')) {
        location.assign('home.html');
    }
});
/*
Acesso:
1. Verificação de há usuário e senha (se conferem)
2. Se não, aparecer mensagem
3. Se sim, logar e carregar a key usuário logado
*/
const formularioLoginHTML = document.getElementById('formEntrar');
formularioLoginHTML.addEventListener('submit', (e) => {
    e.preventDefault();
    logarUsuario();
});
function logarUsuario() {
    const inputUsuarioLoginHTML = document.getElementById('usuarioLogin');
    const inputSenhaLoginHTML = document.getElementById('senhaLogin');
    const usuariosLocalStorage = carregaListaUsuariosLocalStorage();
    const alertaErroLoginHTML = document.getElementById('alertaErroLogin');
    const usuarioLogado = usuariosLocalStorage.find((user) => user.usuario === inputUsuarioLoginHTML.value);
    if (!usuarioLogado || usuarioLogado.senha !== inputSenhaLoginHTML.value) {
        alertaErroLoginHTML.innerHTML = "";
        const wrapper = document.createElement('div');
        wrapper.innerHTML = [
            `<div class="alert alert-danger alert-dismissible" role="alert">`,
            `   <div>Algo de errado não está certo! </br> Verifique usuário e senha.</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('');
        alertaErroLoginHTML.append(wrapper);
        return;
    }
    const indexUsuarioLogado = usuariosLocalStorage.findIndex((user) => user.usuario === inputUsuarioLoginHTML.value);
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
    localStorage.setItem('indiceUsuarioLogado', JSON.stringify(indexUsuarioLogado));
    window.location.assign('home.html');
}
/*
Cadastrar usuário:
1. Verificações (senhas iguais)
2. Verificar se já existe nome de usuário na lista do localStorage;
3. Cadastro do usuário na lista de usuários no localStorage;
4. Limpar campos;
5. Mensagem de usuário cadastrado;
*/
const formularioCadastroHTML = document.getElementById('formulario-cadastro');
formularioCadastroHTML.addEventListener('submit', (e) => {
    e.preventDefault();
    cadastrarNovoUsuario();
});
const botaoFecharModalHTML = document.getElementById('botaoFecharModal');
botaoFecharModalHTML.addEventListener('click', () => {
    formularioCadastroHTML.reset();
});
function cadastrarNovoUsuario() {
    const inputUsuarioCadastroHTML = document.getElementById('usuarioCadastro');
    const inputSenhaCadastroHTML = document.getElementById('senhaCadastro');
    const inputConfirmaSenhaCadastroHTML = document.getElementById('confirmaSenha');
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    const usuariosLocalStorage = carregaListaUsuariosLocalStorage();
    const jaExisteUsuario = usuariosLocalStorage.some((e) => e.usuario === inputUsuarioCadastroHTML.value);
    console.log(`usuariosLocalStorage: ${usuariosLocalStorage}`);
    console.log(`inputUsuárioCadastroHTML: ${inputUsuarioCadastroHTML.value}`);
    if (jaExisteUsuario) {
        alertPlaceholder.innerHTML = "";
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `
            <div id="my-alert" class="alert alert-danger alert-dismissible" role="alert">
               <div>Nome de Usuário já existe!</div>
            </div>`;
        alertPlaceholder.append(wrapper);
        setTimeout(() => {
            alertPlaceholder.innerHTML = "";
        }, 2000);
        return;
    }
    if (inputSenhaCadastroHTML.value !== inputConfirmaSenhaCadastroHTML.value) {
        alertPlaceholder.innerHTML = "";
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `
            <div id="my-alert" class="alert alert-danger alert-dismissible" role="alert">
               <div>Senhas não conferem!</div>
            </div>`;
        alertPlaceholder.append(wrapper);
        setTimeout(() => {
            alertPlaceholder.innerHTML = "";
        }, 2000);
        return;
    }
    const novoUsuario = {
        usuario: inputUsuarioCadastroHTML.value,
        senha: inputSenhaCadastroHTML.value,
        recados: []
    };
    console.log(`usuarios localStorage antes do push: ${usuariosLocalStorage}`);
    usuariosLocalStorage.push(novoUsuario);
    console.log(`usuarios localStorage depois do push: ${usuariosLocalStorage}`);
    const myModalSucess = new bootstrap.Modal("#modalContaCriadaComSucesso");
    myModal.toggle();
    myModalSucess.toggle();
    formularioCadastroHTML.reset();
    localStorage.setItem('usuariosLocalStorage', JSON.stringify(usuariosLocalStorage));
}
function carregaListaUsuariosLocalStorage() {
    const listaUsuariosLocalStorage = JSON.parse(localStorage.getItem('usuariosLocalStorage') || '[]');
    return listaUsuariosLocalStorage;
}
const darkMode = document.querySelector("#toggleButton");
darkMode.addEventListener("click", () => {
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
