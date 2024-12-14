import { Box, Button, Container, Divider, TextField, Typography, Snackbar, Alert } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userRepository from '../../data/repositories/userRepository';
import authenticateUser from '../../data/usecases/authenticateUser';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');
  const navigate = useNavigate();

  const validate = () => {
    // eslint-disable-next-line no-shadow
    const errors = {};
    if (!email) errors.email = 'O e-mail é obrigatório';
    if (!password) errors.password = 'A senha é obrigatória';
    return errors;
  };

  const handleSubmit = async event => {
    event.preventDefault();
    // eslint-disable-next-line no-shadow
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setSnackbarMessage('Por favor, preencha todos os campos');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    try {
      await authenticateUser.signInUser(email, password);
      navigate('/');
    } catch (error) {
      console.error('Falha no login', error);
      setSnackbarMessage('Falha no login');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await userRepository.signInWithGoogle();
      navigate('/');
    } catch (error) {
      console.error('Erro ao entrar com o Google: ', error);
      setSnackbarMessage('Erro ao entrar com o Google');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        flexDirection: 'column',
        height: '100vh',
        width: '100%'
      }}
    >
      <Container component="main" maxWidth="xs">
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Typography component="h1" variant="h5">
            Acessar conta
          </Typography>
          <p>Seja bem-vindo de volta!</p>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Endereço de E-mail"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Senha"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Acessar
          </Button>
          <Divider sx={{ mb: 2 }}>ou</Divider>
          <Button onClick={() => navigate('/signup')} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Criar Conta
          </Button>
          <Button onClick={handleGoogleSignIn} fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}>
            Entrar com Google
          </Button>
        </Box>
      </Container>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default LoginPage;
