import React, { useEffect, useState } from 'react'
import {Typography, Button, Box, Card, CardActions, CardContent } from "@material-ui/core"
import './DeletarPostagem.css';
import Postagem from '../../../models/Postagem';
import { useHistory, useParams } from 'react-router-dom';
import { buscaId, deleteId } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';


function DeletarPostagem() {
    let history = useHistory();

    const {id} = useParams<{id: string}>();
    
    const token = useSelector<TokenState, TokenState["tokens"]>( // constante que vai acessar nosso store e pegar o token e atribuir a essa constante
    (state) => state.tokens
  );

    const [post, setPosts] = useState<Postagem>()
        

    useEffect(() => {
        if (token === "") {
          toast.error('Você precisa estar logado', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
            progress: undefined,
        });

          history.push("/login")
    
        }
      }, [token])

      async function findById(id: string) {
        await buscaId(`/postagens/${id}`, setPosts, {
            headers: {
                'Authorization': token
            }
        })
    }

      useEffect(()=> {
          if(id !== ""){
              findById(id)
          }
      }, [id])

      async function sim() {
        history.push('/posts')

        await deleteId(`/postagens/${id}`, {
            headers: {
                'Authorization': token
            }
        });

        toast.success('Postagem deletada com sucesso', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "colored",
          progress: undefined,
      });

    }

    function nao() {
        history.push('/posts')
    }
  return (
    <>
      <Box m={2}>
        <Card variant="outlined" >
          <CardContent>
            <Box justifyContent="center">
              <Typography color="textSecondary" gutterBottom>
                Deseja deletar a Postagem:
              </Typography>
              <Typography color="textSecondary" >
              {post?.titulo}
              </Typography>
            </Box>

          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
              <Box mx={2}>
              <Button onClick={sim} variant="contained" className="marginLeft" size='large' color="primary">
                Sim
              </Button>
              </Box>
              <Box>
              <Button onClick={nao} variant="contained" className='btndeletar' size='large' color="secondary">
                Não
              </Button>
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
export default DeletarPostagem;