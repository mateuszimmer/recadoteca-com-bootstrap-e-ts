const modalRecados = new bootstrap.Modal('#modalRecados')

document.addEventListener('DOMContentLoaded', ():void => {
    if(!(localStorage.getItem('usuarioLogado'))){
        location.assign('index.html')
    }
})

// ------ Modo Dark ------
 
const modoD = localStorage.getItem('dark') || ""

if(modoD === 'true'){
    document.body.classList.add('dark-theme');
    localStorage.setItem('dark', 'true');
} else {
    document.body.classList.remove('dark-theme');
    localStorage.setItem('dark', 'false');
}

const darkModeH = document.querySelector("#toggleButton")as HTMLButtonElement;

darkModeH.addEventListener("click", () => {
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

// ------ Interfaces utilizadas ------

interface Usuario {
    usuario: string,
    senha: string,
    recados: Recado[]
}

interface Recado {
    titulo: string,
    descricao: string
}

//---------- Carregar nome do Usuário no HTML -----------

carregarNomeDoUsuarioNoHTML();

function carregarNomeDoUsuarioNoHTML():void{
    const usuarioLogado: Usuario = buscarUsuarioLogadonoLocalStorage();
    const nomeDoUsuarioNoHTML = document.querySelector('#nomeDoUsuario') as HTMLSpanElement
    nomeDoUsuarioNoHTML.innerText = `${usuarioLogado.usuario}`
}

//---------- Buscar Usuário Logado no localStorage -------

function buscarUsuarioLogadonoLocalStorage(): Usuario {
    return JSON.parse(localStorage.getItem('usuarioLogado') || '[]') as Usuario
}

//----------- Abrir Modal --------------

carregaBotoesParaAbrirModal()

function carregaBotoesParaAbrirModal(): void {
    const botoesModalHTML = document.querySelectorAll('.btnAbrirModal')
    botoesModalHTML.forEach((botao) =>{
        botao.addEventListener('click', ()=>{
            modalRecados.toggle();
            const identificarOQueFazer = botao.getAttribute('data-bs-whatever')
            const tituloDoModalHTML = document.querySelector('#tituloDoModal') as HTMLHeadElement
            tituloDoModalHTML.innerText = `${identificarOQueFazer}`
        })
    })
}

//------------- Salvar recado ---------------

const formularioCadastroRecadosHTML = document.querySelector('#formularioCadastroRecados') as HTMLFormElement;

formularioCadastroRecadosHTML.addEventListener('submit', (e) => {
    e.preventDefault();
    salvarRecado();
    modalRecados.toggle();
})

function salvarRecado(){
    const inputHiddenHTML = document.querySelector('#inputPosicaoArray') as HTMLInputElement
    const inputTituloRecadoHTML = document.querySelector('#inputTituloRecado') as HTMLInputElement
    const inputDescricaoRecadoHTML = document.querySelector('#inputDescricaoRecado') as HTMLInputElement
    const usuarioLogado: Usuario = buscarUsuarioLogadonoLocalStorage()

    const recadoParaSalvar: Recado = {
        titulo: inputTituloRecadoHTML.value,
        descricao: inputDescricaoRecadoHTML.value
    }
    
    if(inputHiddenHTML.value !== ''){
        const valorInputHidden = Number(inputHiddenHTML.value)
        usuarioLogado.recados[valorInputHidden] = recadoParaSalvar
    } else {
        usuarioLogado.recados.push(recadoParaSalvar)
    }

    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))
    
    salvaOUsuarioNaListaDeUsuarios(usuarioLogado)
    
    imprimeRecadosAtualizados();

    inputHiddenHTML.value = '';
    inputTituloRecadoHTML.value = '';
    inputDescricaoRecadoHTML.value = '';
}

function salvaOUsuarioNaListaDeUsuarios(usuarioLogado: Usuario){
    const arrayDeUsuarios: Usuario[] = JSON.parse(localStorage.getItem('usuariosLocalStorage') || "[]")
    const indexUsuarioLogado: number = Number(localStorage.getItem('indiceUsuarioLogado'))
    arrayDeUsuarios[indexUsuarioLogado] = usuarioLogado
    localStorage.setItem('usuariosLocalStorage', JSON.stringify(arrayDeUsuarios))
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))
}

//------------ Imprime Recados Atualizados ---------

imprimeRecadosAtualizados();

function imprimeRecadosAtualizados(): void {
    const listaDeRecados = JSON.parse(localStorage.getItem('usuarioLogado') || '[]').recados
    const localDosRecados = document.querySelector('#recados') as HTMLTableElement
    localDosRecados.innerHTML = '';

    listaDeRecados.forEach((recado: Recado, indice:number) => {

        const recados = document.getElementById('recados') as HTMLTableElement;

        const tr = document.createElement('tr') as HTMLTableRowElement
        adicionaClasses(tr, ['text-center'])

        const indiceTr = criarColuna(JSON.stringify(indice));
        const tituloTd = criarColuna(recado.titulo);
        const descricaoTd = criarColuna(recado.descricao);
        const acoesTd = criarColuna('')

         
        const btnEditar = document.createElement('button') as HTMLButtonElement;
        adicionaClasses(btnEditar, ["btn", "btnDark", "btn-outline-secondary", "btnAbrirModal", "me-1"]);
        btnEditar.innerHTML= 'Editar'
        btnEditar.setAttribute('data-bs-whatever', `Editando o Recado ${indice}`)
        btnEditar.setAttribute('id', `botaoEditarIndice${indice}`)
        btnEditar.addEventListener('click', (e) => {
            editarRecado(indice)
        });


        const btnApagar = document.createElement('button')as HTMLButtonElement;
        adicionaClasses(btnApagar, ["btn","btn-outline-danger",]);
        btnApagar.innerHTML= 'Apagar'
        btnApagar.addEventListener('click', (e) => {
            apagarRecado(indice)
        });

        acoesTd.appendChild(btnEditar)
        acoesTd.appendChild(btnApagar)

        tr.appendChild(indiceTr)
        tr.appendChild(tituloTd)
        tr.appendChild(descricaoTd)
        tr.appendChild(acoesTd)

        recados.appendChild(tr)

        carregaBotoesParaAbrirModal()
    })
}

function criarColuna(texto:string): HTMLTableCellElement{
    const coluna = document.createElement('td') as HTMLTableCellElement;
    coluna.innerText = texto;
    return coluna
}

function adicionaClasses(elemento: HTMLElement, classes: string[]) {
    for (const classe of classes) {
      elemento.classList.add(classe);
    }
}

//--------------- Editar Recado -----------------

function editarRecado(indice: number) {
    const inputHiddenHTML = document.querySelector('#inputPosicaoArray') as HTMLInputElement
    const inputTituloRecadoHTML = document.querySelector('#inputTituloRecado') as HTMLInputElement
    const inputDescricaoRecadoHTML = document.querySelector('#inputDescricaoRecado') as HTMLInputElement
    const usuarioLogado: Usuario = buscarUsuarioLogadonoLocalStorage()
    modalRecados.toggle();
    
    inputHiddenHTML.value = `${indice}`
    inputTituloRecadoHTML.value = usuarioLogado.recados[indice].titulo;
    inputDescricaoRecadoHTML.value = usuarioLogado.recados[indice].descricao;
}

//--------------- Apagar Recado ------------------

function apagarRecado(indice: number){
    const usuarioLogado: Usuario = buscarUsuarioLogadonoLocalStorage()
    usuarioLogado.recados.splice(indice, 1)
    
    console.log(usuarioLogado)

    salvaOUsuarioNaListaDeUsuarios(usuarioLogado);
    
    imprimeRecadosAtualizados();
}

//--------- Fechar Modal -------

const botaoFecharModalHomeHTML = document.querySelectorAll('.botaoFecharModal') as NodeListOf<Element>
botaoFecharModalHomeHTML.forEach((e) => {
    e.addEventListener('click', () => {
        const inputHiddenHTML = document.querySelector('#inputPosicaoArray') as HTMLInputElement
        const inputTituloRecadoHTML = document.querySelector('#inputTituloRecado') as HTMLInputElement
        const inputDescricaoRecadoHTML = document.querySelector('#inputDescricaoRecado') as HTMLInputElement
        inputHiddenHTML.value = '';
        inputTituloRecadoHTML.value = '';
        inputDescricaoRecadoHTML.value = '';
    })
})

// ------ Botão Sair ------

const btnSair = document.getElementById('btnSair')as HTMLButtonElement;

btnSair.addEventListener('click', sair);

function sair(): void{
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('indiceUsuarioLogado');
    window.location.href = 'index.html'
}