import React, { useState } from 'react';
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Link,
  Alert,
  AlertTitle,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { authService } from '@api/auth';
import { CreateUserData } from '@lib/interfaces/auth.interface';
import { isValidEmail, isValidPassword } from '@lib/utils/validates';

function CreateUser() {
  const [formData, setFormData] = useState<CreateUserData>({
    email: '',
    password: '',
    fullName: '',
  });

  const [errors, setErrors] = useState<Partial<CreateUserData>>({});
  const [isUserCreated, setIsUserCreated] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors: Partial<CreateUserData> = {};

    if (formData.email.trim() === '') {
      newErrors.email = 'El correo electrónico es obligatorio.';
    }

    if (!isValidEmail(formData.email)) {
      newErrors.email = 'El formato del correo electrónico no es válido.';
    }

    if (formData.password.trim() === '') {
      newErrors.password = 'La contraseña es obligatoria.';
    } else if (!isValidPassword(formData.password)) {
      newErrors.password =
        'La contraseña debe tener una letra mayúscula, una minúscula y un número';
    }

    if (formData.fullName.trim() === '') {
      newErrors.fullName = 'El nombre completo es obligatorio.';
    }

    if (formData.fullName.length < 10) {
      newErrors.fullName =
        'El nombre completo debe tener al menos 10 caracteres.';
    }

    return newErrors;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      authService
        .createUser(formData)
        .then(() => {
          setIsUserCreated(true);
          setSuccessMessage('Usuario creado exitosamente');
          console.log('Formulario enviado con datos:', formData);
        })
        .catch((error) => {
          setSuccessMessage('ERROR: ' + error);
        });
    }
  };

  const containerStyle = {
    height: '100vh',
    background:
      'radial-gradient(circle, rgb(241 50 50 / 29%) 33%, rgba(0, 0, 0, 0) 80%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const paperStyle = {
    padding: 16,
    width: 400,
    margin: '0 auto',
    marginTop: '32px',
  };

  const headerTextStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#ffcb03',
    textShadow: '2px 2px 4px rgba(58, 93, 168, 1)',
    textAlign: 'center',
  };

  const inputStyle = {
    marginBottom: 16,
  };

  const buttonStyle = {
    marginTop: 16,
  };

  return (
    <Grid container style={containerStyle}>
      <Paper elevation={3} style={paperStyle}>
        <Typography variant="h5" sx={headerTextStyle}>
          Crear Usuario
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <TextField
            fullWidth
            label="Correo Electrónico"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            error={!!errors.email}
            helperText={errors.email}
            required
            style={inputStyle}
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
            style={inputStyle}
          />
          <TextField
            fullWidth
            label="Nombre Completo"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            error={!!errors.fullName}
            helperText={errors.fullName}
            required
            style={inputStyle}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={buttonStyle}
          >
            Crear Usuario
          </Button>
        </form>
        {isUserCreated && (
          <Alert severity="success" sx={{ marginTop: 2 }}>
            <AlertTitle>Éxito</AlertTitle>
            {successMessage}
          </Alert>
        )}
        <Typography variant="body2" style={{ marginTop: 16 }}>
          ¿Ya tienes una cuenta?{' '}
          <Link component={RouterLink} to="/login">
            Iniciar Sesión
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
}

export default CreateUser;
