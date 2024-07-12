declare global {
    type Product = {
        id: number
        nome: string
        marca: string
        descricao: string
        preco: number
        imagem: string
        categorias: string[]
        subcategorias: string[]
        cores: string[]
        tamanhos: {
            nome: string
            quantidade: number
        }[]
    }
}
export { }; 