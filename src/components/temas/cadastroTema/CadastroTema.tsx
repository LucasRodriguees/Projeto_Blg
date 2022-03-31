import React, {useState, useEffect, ChangeEvent} from 'react'
import { Container, Typography, TextField, Button } from "@material-ui/core"
import { useHistory, useParams } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';

import Tema from '../../../models/Tema';
import "./CadastroTema.css";
import { buscaId, post, put } from '../../../services/Service';


function CadastroTema() {
    let history = useHistory();

    const {id} = useParams<{id: string}>();
    
    const [token, setToken] = useLocalStorage("token");

    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: ""
    })

    useEffect(() => {
        if (token == "") {
          alert("Você precisa estar logado")
          history.push("/login")
    
        }
      }, [token])

      async function findById(id: string) {
        await buscaId(`/temas/${id}`, setTema, {
            headers: {
                'Authorization': token
            }
        })
    }

      useEffect(()=> {
          if(id !== undefined){
              findById(id)
          }
      }, [id])

      function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [e.target.name]: e.target.value
        })
    }
  
    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
     
        if (id !== undefined) {
         
            try {
                await put(`/temas`, tema, setTema, {
                    headers: {
                        'Authorization': token
                    }
                })

                alert('Tema atualizado com sucesso');

        
            } catch (error) {
                console.log(`Error: ${error}`)
                alert("Erro, por favor verifique a quantidade minima de caracteres")
            }

        } else {
           
            try {
                await post(`/temas`, tema, setTema, {
                    headers: {
                        'Authorization': token
                    }
                })
                
                alert('Tema cadastrado com sucesso');
            
            } catch (error) {
                console.log(`Error: ${error}`)
                alert("Erro, por favor verifique a quantidade minima de caracteres")
            }
        }
        
        back()
    }

    function back() {
        history.push('/temas')
    }

    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro tema</Typography>
                <TextField
                    value={tema.descricao}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                    id="descricao"
                    label="descricao"
                    variant="outlined"
                    name="descricao"
                    margin="normal"
                    fullWidth
                />
                <Button type="submit" className="bootao" variant="contained" color="primary">
                    Finalizar
                </Button>
            </form>
        </Container>
    )
   
}

export default CadastroTema;