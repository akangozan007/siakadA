import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Copyright from '../user/internals/components/Copyright';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from '@mui/material/TextField';
// import profilePic from '.assets/images/profile.jpg';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));


export default function MainAccount() {
  return (
    <>
    
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Account Settings
      </Typography>
      <Grid container spacing={2}>
        <Grid size={4}>
          <Item> 
            <img src={`${process.env.PUBLIC_URL}/assets/images/profile.jpg`} className='img-fluid border-none' alt='...' />
          </Item>
        </Grid>
        <Grid size={8}>
            {/* Grid pertama */}
          <Item>
          <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': {
                      m: 1,
                      width: '100%',      // ubah di sini
                      maxWidth: '400px',  // opsional: batasi maksimal
                    },
                  }}
                noValidate
                autoComplete="off"
                >
                <div>
                <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                  Your Detail
                </Typography>
                     <TextField disabled id="standard-disabled" label="Nama lengkap" defaultValue="Muhammad razan rizqullah" variant="standard" />
                    <TextField  fullWidth disabled id="standard-disabled" label="Nomor Induk Mahasiswa" defaultValue="12345678" variant="standard"/>
                    <TextField  fullWidth id="standard-basic"   type="email" label="Alamat email" variant="standard" />
                    <TextField  fullWidth id="standard-password-input"  type="password" label="Password" autoComplete="current-password" variant="standard" />
                    <TextField  fullWidth disabled id="standard-disabled" label="Alamat" defaultValue="Desa kaligawe" variant="standard"/>
                    <TextField  fullWidth disabled id="standard-disabled" label="Account type" defaultValue="Mahasiswa" variant="standard"/>
                </div>
             </Box>
          </Item>
        </Grid>
            {/* Grid pertama */}
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
    </>
  );
}
