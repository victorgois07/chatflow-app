import { Box, Button, Container, Divider, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import createUser from '../../data/usecases/CreateUser';
import signGoogle from '../../data/usecases/SignGoogle';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await createUser.execute(email, password, name, username);
      navigate('/login');
    } catch (error) {
      console.error('Error signing up: ', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signGoogle.execute();
      navigate('/');
    } catch (error) {
      console.error('Error signing in with Google: ', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Button onClick={handleGoogleSignIn} fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}>
        Sign in with Google
      </Button>
      <Divider sx={{ mb: 2 }}>or</Divider>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
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
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Sign Up
        </Button>
      </Box>
    </Container>
  );
}

export default SignupPage;
