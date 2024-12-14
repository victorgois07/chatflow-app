import React, { useState } from 'react';
import { Box, Button, Divider, TextField, Typography, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import createUser from '../../data/usecases/CreateUser';
import signGoogle from '../../data/usecases/SignGoogle';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();

  const validate = () => {
    // eslint-disable-next-line no-shadow
    const errors = {};
    if (!name) errors.name = 'Nome é obrigatório';
    if (!username) errors.username = 'Nome de usuário é obrigatório';
    if (!email) errors.email = 'Email é obrigatório';
    if (!password) errors.password = 'Senha é obrigatório';
    return errors;
  };

  const handleSubmit = async event => {
    event.preventDefault();
    // eslint-disable-next-line no-shadow
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setSnackbarMessage('Please fill out all fields');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }
    try {
      await createUser.execute(email, password, name, username);
      setSnackbarMessage('Signup successful');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      navigate('/login');
    } catch (error) {
      console.error('Error signing up: ', error);
      setSnackbarMessage('Signup failed');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signGoogle.execute();
      setSnackbarMessage('Signed in with Google');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      navigate('/');
    } catch (error) {
      console.error('Error signing in with Google: ', error);
      setSnackbarMessage('Google Sign-in failed');
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
        height: '100vh',
        textAlign: 'center'
      }}
    >
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%', maxWidth: 400 }}>
        <Typography component="h1" variant="h5">
          Registrar conta
        </Typography>
        <p>Seja bem-vindo a nossa plataforma!</p>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Name"
          autoComplete="name"
          autoFocus
          value={name}
          onChange={e => setName(e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Username"
          autoComplete="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          error={!!errors.username}
          helperText={errors.username}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email Address"
          type="email"
          autoComplete="email"
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
          label="Password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
        />

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Registrar dados
        </Button>
        <Divider sx={{ mb: 2 }}>ou</Divider>
        <Button onClick={() => navigate('/login')} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Acessar conta
        </Button>

        <Button onClick={handleGoogleSignIn} fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}>
          Registar com Google
        </Button>
      </Box>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SignupPage;
