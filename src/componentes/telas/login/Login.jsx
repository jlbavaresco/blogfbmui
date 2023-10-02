import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Alerta from '../../comuns/Alerta';
import Carregando from '../../comuns/Carregando';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";
import { auth, signInWithGoogle } from '../../../firebaseConfig';
import { useAuthState } from "react-firebase-hooks/auth";

function Login() {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [autenticado, setAutenticado] = useState(false);
    const [carregando, setCarrengando] = useState(false);
    const [user, loading, error] = useAuthState(auth);

    let navigate = useNavigate();

    const acaoLogin = async e => {

        e.preventDefault();

        try {
            setCarrengando(true);        
        } catch (err) {            
            setAlerta({ status: "error", message: err.message })
        } finally {
            setCarrengando(false);
        }
    };

    useEffect(() => {
        if (loading) {
          // maybe trigger a loading screen
          return;
        }
        if (user) navigate("/");
      }, [user, loading]);

    return (
        <div>

            <Carregando carregando={carregando}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Login de Usuário
                        </Typography>
                        <Alerta alerta={alerta} />
                        <Box component="form" onSubmit={acaoLogin} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="login"
                                label="Login"
                                value={login}
                                name="login"
                                onChange={e => setLogin(e.target.value)}
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                value={password}
                                name="password"
                                onChange={e => setPassword(e.target.value)}
                                label="Senha"
                                type="password"
                                id="password"
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Efetuar Login
                            </Button>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={signInWithGoogle}
                            >
                                Efetuar Login com Google
                            </Button>                            

                        </Box>
                    </Box>
                </Container>
            </Carregando>

        </div>
    )

}

export default Login;