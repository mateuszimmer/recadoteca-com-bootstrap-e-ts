const myModal = new bootstrap.Modal("#modalCriarConta");
const myModalSucess = new bootstrap.Modal("#modalContaCriadaComSucesso");


const modoDar = localStorage.getItem('dark') || ""

if(modoDar === 'true'){
    document.body.classList.add('dark-theme');
    localStorage.setItem('dark', 'true');
} else {
    document.body.classList.remove('dark-theme');
    localStorage.setItem('dark', 'false');
}














// Ao acessar a página, verificar se há usuário logado. Se sim, direcionar para a home.

interface Usuario {
    usuario: string,
    senha: string,
    recados: Recado[]
}

interface Recado {
    titulo: string,
    descricao: string
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

const formularioLoginHTML = document.getElementById('formEntrar') as HTMLFormElement

formularioLoginHTML.addEventListener('submit', (e) => {
    e.preventDefault();
    logarUsuario();
})

function logarUsuario() {
    const inputUsuarioLoginHTML = document.getElementById('usuarioLogin') as HTMLInputElement;
    const inputSenhaLoginHTML = document.getElementById('senhaLogin') as HTMLInputElement;
    const usuariosLocalStorage: Usuario[] = carregaListaUsuariosLocalStorage();
    const alertaErroLoginHTML = document.getElementById('alertaErroLogin') as HTMLDivElement
    const usuarioLogado: Usuario | undefined = usuariosLocalStorage.find((user) => user.usuario === inputUsuarioLoginHTML.value)
    
    if(!usuarioLogado || usuarioLogado.senha !== inputSenhaLoginHTML.value){
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
    
    const indexUsuarioLogado: Number = usuariosLocalStorage.findIndex((user) => user.usuario === inputUsuarioLoginHTML.value)
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))
    localStorage.setItem('indiceUsuarioLogado', JSON.stringify(indexUsuarioLogado))
    window.location.assign('home.html')
}





/*
Cadastrar usuário:
1. Verificações (senhas iguais)
2. Verificar se já existe nome de usuário na lista do localStorage;
3. Cadastro do usuário na lista de usuários no localStorage;
4. Limpar campos;
5. Mensagem de usuário cadastrado;
*/
const formularioCadastroHTML = document.getElementById('formulario-cadastro') as HTMLFormElement
formularioCadastroHTML.addEventListener('submit', (e):void => {
    e.preventDefault();
    cadastrarNovoUsuario();
})

const botaoFecharModalHTML = document.getElementById('botaoFecharModal') as HTMLButtonElement
botaoFecharModalHTML.addEventListener('click', ():void => {
    formularioCadastroHTML.reset()
})

function cadastrarNovoUsuario(): void{
        const inputUsuarioCadastroHTML = document.getElementById('usuarioCadastro') as HTMLInputElement;
        const inputSenhaCadastroHTML = document.getElementById('senhaCadastro') as HTMLInputElement;
        const inputConfirmaSenhaCadastroHTML = document.getElementById('confirmaSenha') as HTMLInputElement;
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder') as HTMLDivElement;
        
        const usuariosLocalStorage: Usuario[] = carregaListaUsuariosLocalStorage();
        const jaExisteUsuario: boolean = usuariosLocalStorage.some((e: Usuario) => e.usuario === inputUsuarioCadastroHTML.value);
        
        console.log(`usuariosLocalStorage: ${usuariosLocalStorage}`)
        console.log(`inputUsuárioCadastroHTML: ${inputUsuarioCadastroHTML.value}`)

        if(jaExisteUsuario){
            alertPlaceholder.innerHTML = "";
            const wrapper = document.createElement('div');
            wrapper.innerHTML= `
            <div id="my-alert" class="alert alert-danger alert-dismissible" role="alert">
               <div>Nome de Usuário já existe!</div>
            </div>`
            alertPlaceholder.append(wrapper);

            setTimeout(()=>{
                alertPlaceholder.innerHTML = "";
            },2000)
            return;
        }
    
        if (inputSenhaCadastroHTML.value !== inputConfirmaSenhaCadastroHTML.value){
            alertPlaceholder.innerHTML = "";
            const wrapper = document.createElement('div');
            wrapper.innerHTML= `
            <div id="my-alert" class="alert alert-danger alert-dismissible" role="alert">
               <div>Senhas não conferem!</div>
            </div>`
            alertPlaceholder.append(wrapper);

            setTimeout(()=>{
                alertPlaceholder.innerHTML = "";
            },2000)
            return;
        }

        const novoUsuario: Usuario = {
            usuario: inputUsuarioCadastroHTML.value,
            senha: inputSenhaCadastroHTML.value,
            recados: []
        }
        
        console.log(`usuarios localStorage antes do push: ${usuariosLocalStorage}`)
        usuariosLocalStorage.push(novoUsuario);
        console.log(`usuarios localStorage depois do push: ${usuariosLocalStorage}`)
        
        const myModalSucess = new bootstrap.Modal("#modalContaCriadaComSucesso");
        myModal.toggle();
        myModalSucess.toggle()

        formularioCadastroHTML.reset();
        
        localStorage.setItem('usuariosLocalStorage',JSON.stringify(usuariosLocalStorage));

}


function carregaListaUsuariosLocalStorage(): Usuario[] {
    const listaUsuariosLocalStorage: Usuario[] = JSON.parse(localStorage.getItem('usuariosLocalStorage') || '[]')
    return listaUsuariosLocalStorage
}




const darkMode = document.querySelector("#toggleButton")as HTMLButtonElement;

darkMode.addEventListener("click", () => {
    // document.body.classList.toggle('dark-theme');

    const modo = localStorage.getItem('dark') || ""

    if(modo === 'false'){
        document.body.classList.add('dark-theme');
        localStorage.setItem('dark', 'true');
    } else {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('dark', 'false');
    }

});
