import React from "react";
import { Box, TextField, Container, Typography, Link } from '@mui/material';
import logoJcsx from '../assets/logoJcsx.svg';
import ButtonStyled from "../components/ButtonStyled";
import { Link as RouterLink } from 'react-router-dom';

export default function Login() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#fff',
      }}
    >
      <Box
        sx={{
          width: '400px',
          padding: '20px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}
      >
        <img
          src={logoJcsx}
          alt="JCSx Logo"
          style={{
            marginBottom: '15px',
            maxWidth: '100%',
            height: 'auto',
            filter: 'invert(1)',
          }}
        />

        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <TextField
            label="CPF"
            variant="outlined"
            size="small"
            fullWidth

          />
          <TextField
            label="Senha"
            type="password"
            variant="outlined"
            size="small"
            fullWidth

          />
          <ButtonStyled component={RouterLink} to="/dashboard">Login</ButtonStyled>
        </Box>
      </Box>
    </Container>
  );
}
