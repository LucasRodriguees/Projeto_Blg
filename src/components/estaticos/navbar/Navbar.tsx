import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { addToken } from "../../../store/tokens/actions";
import { TokenState } from "../../../store/tokens/tokensReducer";

function Navbar() {
    let history = useHistory();
    const dispatch = useDispatch();
    const token = useSelector<TokenState, TokenState["tokens"]>( // constante que vai acessar nosso store e pegar o token e atribuir a essa constante
        (state) => state.tokens
      );

    function goLogout() {
        dispatch(addToken(''));
        alert("Usuario deslogado")
        history.push("/login")
    }

    var navbarComponent;

    if(token !== ''){
        navbarComponent = <AppBar position="static" className="nav" >
        <Toolbar variant="dense">
            <Box className="cursor">
                <Typography variant="h5" color="inherit">
                    Blog Pessoal
                </Typography>
            </Box>

            <Box display="flex" justifyContent="start">
                <Link to="/home" className="text-decorator-none">
                    <Box mx={1} className="cursor">
                        <Typography variant="h6" color="inherit">
                            home
                        </Typography>
                    </Box>
                </Link>
                <Link to="/posts" className="text-decorator-none">
                    <Box mx={1} className="cursor">
                        <Typography variant="h6" color="inherit">
                            postagens
                        </Typography>
                    </Box>
                </Link>
                <Link to="/temas" className="text-decorator-none">
                    <Box mx={1} className="cursor">
                        <Typography variant="h6" color="inherit">
                            temas
                        </Typography>
                    </Box>
                </Link>
                <Link to="/formularioTema" className="text-decorator-none">
                    <Box mx={1} className="cursor">
                        <Typography variant="h6" color="inherit">
                            cadastrar tema
                        </Typography>
                    </Box>
                </Link>
                
                    <Box mx={1} className="cursor" onClick={goLogout}>
                        <Typography variant="h6" color="inherit">
                            logout
                        </Typography>
                    </Box>
            

            </Box>

        </Toolbar>
    </AppBar>
    }

    return (
        <>
            {navbarComponent}
        </>

    )

}

export default Navbar;