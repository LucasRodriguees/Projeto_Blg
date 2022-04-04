export type Action = {type: "ADD_TOKEN"; payload:string}; // exportamos um tipo que nada mais e um objeto e chamamos esse tipo de ação 

export const addToken = (token: string): Action =>({ // aqui vamos criar uma função do tipo Action e assim passamos suas propriedades 
    type: "ADD_TOKEN",
    payload: token,
});