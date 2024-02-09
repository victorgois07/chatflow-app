import { Box, Button, Container, Divider, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userRepository from '../../data/repositories/userRepository';
import authenticateUser from '../../data/usecases/authenticateUser';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      await authenticateUser.signInUser(email, password);
      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await userRepository.signInWithGoogle();
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
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email Address"
          autoComplete="email"
          autoFocus
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
          autoComplete="current-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Sign In
        </Button>
      </Box>
    </Container>
  );
}

export default LoginPage;
