import { createStore } from "redux";
import { tokenReducer } from "./tokens/tokensReducer";

const store = createStore(tokenReducer); // uma constante que vai fazer o nosso gerenciamento dos estados na aplicaçao

export default store; // exportamos store para que seja acessado de qualquer componente react