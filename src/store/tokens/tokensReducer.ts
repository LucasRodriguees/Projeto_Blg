import { Action } from "./actions"; //importamos nosso metodo Action que eo nosso tipo

export interface TokenState { // criamos uma model que vai ter uma propriedade chamada tokens 
    tokens:string
}

const initialState = { // uma constante com estado inicial e seu valor e vazio
    tokens: ""
}

export const tokenReducer = (state: TokenState = initialState, action: Action)=>{ // aqui recebemos dois parametros o estado da nossa aplicação ea açao que vai modificar esse estado 
    switch(action.type){ // fazemos uma validaçao que vai verificar o tipo da minha Action
        case "ADD_TOKEN":{
            return {tokens: action.payload}
        }
        default:  // caso o tipo nao seja add_token usamos um valor padrao que vai me retornar o estado original 
            return state
    }
}