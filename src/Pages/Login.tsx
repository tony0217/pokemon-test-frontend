import React, { useState } from 'react';
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Link,
  Stack,
  Box,
  Alert,
  AlertTitle,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import pokemonImage from 'assets/icons/pokemon.svg';
import pikachuImage from 'assets/icons/pikachu.svg';
import LogoImage from 'assets/icons/Logo-Waco.svg';
import { backgroundGradient, headerTextStyle } from '@styles/theme';
import { isValidEmail } from '@lib/utils/validates';
import { authService } from 'api/auth';
import { useAuthContext } from '@lib/Context/AuthContext';
import { LoginUser } from '@lib/interfaces/auth.interface';

function Login() {
  const [formData, setFormData] = useState<LoginUser>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Partial<LoginUser>>({});
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const { authLogin, setUser } = useAuthContext();


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors: Partial<LoginUser> = {};

    if (formData.email.trim() === '') {
      newErrors.email = 'El correo electrónico es obligatorio.';
    }
    if (!isValidEmail(formData.email)) {
      newErrors.email = 'El formato del correo electrónico no es válido.';
    }
    if (formData.password.trim() === '') {
      newErrors.password = 'La contraseña es obligatoria.';
    }

    return newErrors;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      authService
        .login(formData)
        .then((response) => {
          const { _id: id, token, fullName, ...rest } = response;
          if (response) {
            authLogin(true);
            setUser({ id, token, fullName });
            location.replace('/pokemon-list');
          } else {
            authLogin(false);
            setShowErrorAlert(true);
          }
        })
        .catch((error) => {
          setShowErrorAlert(error);
          error.log("error:", error)
        });
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{
        height: '100vh',
        background:
          'radial-gradient(circle, rgb(241 50 50 / 29%) 33%, rgba(0, 0, 0, 0) 80%)',
      }}
    >
      <Grid item xs={6}>
        <Paper
          elevation={3}
          style={{ padding: 16, width: 600, height: 400 }}
        >
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ ...headerTextStyle }}>
              Iniciar Sesión en
            </Typography>
            <img
              src={pokemonImage}
              alt="Pokémon"
              style={{
                margin: '0px 10px',
                width: 200,
                height: 100,
              }}
            />
          </Box>
          <Stack spacing={6} direction="column">
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Correo Electrónico"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
                required
                style={{ marginBottom: 16 }}
              />
              <TextField
                fullWidth
                label="Contraseña"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                error={!!errors.password}
                helperText={errors.password}
                required
                style={{ marginBottom: 16 }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                <img
                  src={pikachuImage}
                  alt="Pokémon"
                  style={{
                    margin: '0px 10px',
                    width: 45,
                    height: 45,
                  }}
                />
                Iniciar Sesión
              </Button>
            </form>
          </Stack>
          <Typography variant="body2" style={{ marginTop: 16 }}>
            ¿No tienes una cuenta?{' '}
            <Link component={RouterLink} to="/createUser">
              Crear una cuenta
            </Link>
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <img src={LogoImage} style={backgroundGradient} alt="Pokémon" />
      </Grid>
      {showErrorAlert && (
        <Alert
          severity="error"
          onClose={() => setShowErrorAlert(false)}
          style={{ position: 'absolute', top: '16px', right: '16px' }}
        >
          <AlertTitle>Error</AlertTitle>
          Usuario no válido. Por favor, verifique sus credenciales.
        </Alert>
      )}
    </Grid>
  );
}

export default Login;
