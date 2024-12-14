import React from 'react';
import { Container, Typography } from '@mui/material';

function ErrorPage() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Acesso Negado
      </Typography>
      <Typography variant="body1">
        Você não tem permissão para acessar essa página. Por favor, faça login primeiro.
      </Typography>
    </Container>
  );
}

export default ErrorPage;
