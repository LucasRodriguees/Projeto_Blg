interface Tema{
    id: number;
    descricao: string;
    postagem?: [{}] // estamos criando um campo de postagem, que esta sendo iniciado como um Array de obj. vazio
}

export default Tema;