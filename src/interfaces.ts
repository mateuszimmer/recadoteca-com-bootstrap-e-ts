interface Usuario {
    usuario: string,
    senha: string,
    recados: Recado[]
}

interface Recado {
    titulo: string,
    descricao: string
}

export {Usuario, Recado}