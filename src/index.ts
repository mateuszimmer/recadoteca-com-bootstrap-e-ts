// ------ Carrega modais Bootstrap

const myModal = new bootstrap.Modal("#modalCriarConta");
const myModalSucess = new bootstrap.Modal("#modalContaCriadaComSucesso");

// ------ Modo Dark
// ------ Ao inicializar
const modoDar = localStorage.getItem('dark') || ""

if(modoDar === 'true'){
    document.body.classList.add('dark-theme');
    localStorage.setItem('dark', 'true');
} else {
    document.body.classList.remove('dark-theme');
    localStorage.setItem('dark', 'false');
}

// ------ Botão modo dark
const darkMode = document.querySelector("#toggleButton")as HTMLButtonElement;

darkMode.addEventListener("click", () => {

    const modo = localStorage.getItem('dark') || ""

    if(modo === 'false'){
        document.body.classList.add('dark-theme');
        localStorage.setItem('dark', 'true');
    } else {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('dark', 'false');
    }

});

// ------ Interfaces utilizadas

interface Usuario {
    usuario: string,
    senha: string,
    recados: Recado[]
}

interface Recado {
    titulo: string,
    descricao: string
}

// Ao acessar a página, verificar se há usuário logado. Se sim, direcionar para a home.

document.addEventListener('DOMContentLoaded', ():void => {
    if(localStorage.getItem('usuarioLogado')){
        location.assign('home.html')
    }
})

// ------ Login ------

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

// ------ Cadastro novo usuário ----

const formularioCadastroHTML = document.getElementById('formulario-cadastro') as HTMLFormElement
formularioCadastroHTML.addEventListener('submit', (e):void => {
    e.preventDefault();
    cadastrarNovoUsuario();
})

const botoesFecharModalHTML = document.querySelectorAll('.botaoFecarModalCadastro') as NodeListOf<Element>
botoesFecharModalHTML.forEach((botao) => {
    botao.addEventListener('click', ():void => {
        formularioCadastroHTML.reset()
    })
})

function cadastrarNovoUsuario(): void{
        const inputUsuarioCadastroHTML = document.getElementById('usuarioCadastro') as HTMLInputElement;
        const inputSenhaCadastroHTML = document.getElementById('senhaCadastro') as HTMLInputElement;
        const inputConfirmaSenhaCadastroHTML = document.getElementById('confirmaSenha') as HTMLInputElement;
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder') as HTMLDivElement;
        
        const usuariosLocalStorage: Usuario[] = carregaListaUsuariosLocalStorage();
        const jaExisteUsuario: boolean = usuariosLocalStorage.some((e: Usuario) => e.usuario === inputUsuarioCadastroHTML.value);

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
            },3000)
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
            },3000)
            return;
        }

        const novoUsuario: Usuario = {
            usuario: inputUsuarioCadastroHTML.value,
            senha: inputSenhaCadastroHTML.value,
            recados: []
        }
        
        usuariosLocalStorage.push(novoUsuario);
        
        const myModalSucess = new bootstrap.Modal("#modalContaCriadaComSucesso");
        myModal.toggle();
        myModalSucess.toggle()

        formularioCadastroHTML.reset();
        
        localStorage.setItem('usuariosLocalStorage',JSON.stringify(usuariosLocalStorage));
}

// ------------

function carregaListaUsuariosLocalStorage(): Usuario[] {
    const listaUsuariosLocalStorage: Usuario[] = JSON.parse(localStorage.getItem('usuariosLocalStorage') || '[]')
    return listaUsuariosLocalStorage
}
