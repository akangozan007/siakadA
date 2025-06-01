import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ForgotPassword from './ForgotPassword';
import { GoogleIcon, FacebookIcon } from './CustomIcons';
import axios from 'axios'; // Import axios untuk HTTP requests

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
}));

export default function SignInCard() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [serverError, setServerError] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const validateInputs = () => {
    let isValid = true;

    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Masukkan email yang valid.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (password.length < 6) {
      setPasswordError('Password minimal 6 karakter.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError('');
  
    if (!validateInputs()) return;
  
    try {
      const response = await axios.post(
        'http://localhost:8080/api/login',
        {
          "email": email,
          "password": password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          withCredentials: false, // Benar: jika tidak menggunakan cookie login
        }
      );
      
  
      // Cek apakah ada token dalam response
      if (response.data) {
        localStorage.setItem('token', response.data);
        console.log(response.data);
        window.location.href = '/user'; // redirect ke dashboard
      } else {
        setServerError('Token tidak ditemukan dalam response.');
      }
    
      console.log('Login berhasil:', response.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setServerError(error.response.data.message);
        console.log(error.response.data.message);
      } else {
        setServerError('Login gagal. Silakan coba lagi.');
      
      }
    }
  };
 

  return (
    <Card variant="outlined">
      <Typography component="h1" variant="h4" sx={{ textAlign: 'center' }}>
        Login Form
      </Typography>

      {serverError && (
        <Typography color="error" sx={{ textAlign: 'center' }}>
          {serverError}
        </Typography>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <FormControl>
          <FormLabel>Email</FormLabel>
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
            type="email"
            name="email"
            placeholder="your@email.com"
            required
            fullWidth
          />
        </FormControl>

        <FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <FormLabel>Password</FormLabel>
            <Link component="button" onClick={handleClickOpen}>
              Lupa sandi?
            </Link>
          </Box>
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
            type="password"
            name="password"
            placeholder="••••••"
            required
            fullWidth
          />
        </FormControl>

        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Ingat saya"
        />

        <ForgotPassword open={open} handleClose={handleClose} />

        <Button type="submit" fullWidth variant="contained">
          Sign in
        </Button>

        <Typography sx={{ textAlign: 'center' }}>
          Pengguna baru?{' '}
          <Link href="/register" variant="body2">
            Daftar
          </Link>
        </Typography>
      </Box>

      <Divider>or</Divider>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert('Sign in with Google')}
          startIcon={<GoogleIcon />}
        >
          Login dengan Google
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert('Sign in dengan Facebook')}
          startIcon={<FacebookIcon />}
        >
          Login dengan Facebook
        </Button>
      </Box>
    </Card>
  );
}
