"use strict";
const myModal = new bootstrap.Modal("#modalCriarConta");
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
    console.log('chegou aqui');
});
function cadastrarNovoUsuario() {
    const inputUsuarioCadastroHTML = document.getElementById('usuarioCadastro');
    const inputSenhaCadastroHTML = document.getElementById('senhaCadastro');
    const inputConfirmaSenhaCadastroHTML = document.getElementById('confirmaSenha');
    console.log(inputConfirmaSenhaCadastroHTML.value);
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    const usuariosLocalStorage = carregaListaUsuariosLocalStorage();
    const jaExisteUsuario = usuariosLocalStorage.some((e) => e.usuario === inputUsuarioCadastroHTML.value);
    if (jaExisteUsuario) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = [
            `<div class="alert alert-danger alert-dismissible" role="alert">`,
            `   <div>Nome de Usuário já existe!</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('');
        alertPlaceholder.append(wrapper);
        return;
    }
    if (inputSenhaCadastroHTML.value !== inputConfirmaSenhaCadastroHTML.value) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = [
            `<div class="alert alert-danger alert-dismissible" role="alert">`,
            `   <div>Senhas não conferem</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('');
        alertPlaceholder.append(wrapper);
        return;
    }
}
function carregaListaUsuariosLocalStorage() {
    const listaUsuariosLocalStorage = JSON.parse(localStorage.getItem('listaUsuarios') || '[]');
    return listaUsuariosLocalStorage;
}
// // function buscarUsuariosStorage(): Usuario[]{
//     return JSON.parse(localStorage.getItem('usuarios') || '[]');
// }
