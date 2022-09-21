const myModal = new bootstrap.Modal("#modalCriarConta");
// Ao acessar a página, verificar se há usuário logado. Se sim, direcionar para a home.

interface Usuario {
    usuario: string,
    senha: string,
    recados: Array<Recado>
}

interface Recado {
    descricao: string,
    detalhamento: string
}

document.addEventListener('DOMContentLoaded', ():void => {
    if(localStorage.getItem('usuarioLogado')){
        location.assign('home.html')
    }
})

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
const formularioCadastroHTML = document.getElementById('formulario-cadastro') as HTMLFormElement
formularioCadastroHTML.addEventListener('submit', (e) => {
    e.preventDefault();
    cadastrarNovoUsuario();
    console.log('chegou aqui')
})


function cadastrarNovoUsuario(): void{
        const inputUsuarioCadastroHTML = document.getElementById('usuarioCadastro') as HTMLInputElement;
        const inputSenhaCadastroHTML = document.getElementById('senhaCadastro') as HTMLInputElement;
        const inputConfirmaSenhaCadastroHTML = document.getElementById('confirmaSenha') as HTMLInputElement;
               
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder') as HTMLDivElement
        
        const usuariosLocalStorage: Array<Usuario> = carregaListaUsuariosLocalStorage();
        const jaExisteUsuario: boolean = usuariosLocalStorage.some((e: Usuario) => e.usuario === inputUsuarioCadastroHTML.value);
        
        if(jaExisteUsuario){
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
    
        if (inputSenhaCadastroHTML.value !== inputConfirmaSenhaCadastroHTML.value){
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














function carregaListaUsuariosLocalStorage(): Array<Usuario> {
    const listaUsuariosLocalStorage: Array<Usuario> = JSON.parse(localStorage.getItem('listaUsuarios') || '[]')
    return listaUsuariosLocalStorage
}

// // function buscarUsuariosStorage(): Usuario[]{
//     return JSON.parse(localStorage.getItem('usuarios') || '[]');
// }