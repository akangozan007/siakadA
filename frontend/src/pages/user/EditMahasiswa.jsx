import React from 'react';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import Typography from '@mui/material/Typography';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Optional: untuk komponen JS seperti modal, toast, dsb
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {
  createTheme,
  ThemeProvider,
  alpha,
  getContrastRatio,
} from '@mui/material/styles'
import { width } from '@mui/system';

const violetBase = '#7F00FF';
const redBase = '#fe044f';
const violetMain = alpha(violetBase, 0.7);
const redMain = alpha(redBase, 0.7);

const theme = createTheme({
  palette: {
    violet: {
      main: violetMain,
      light: alpha(violetBase, 0.5),
      dark: alpha(violetBase, 0.9),
      contrastText: getContrastRatio(violetMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
    red: {
      main: redMain,
      light: alpha(redBase, 0.5),
      dark: alpha(redBase, 0.9),
      contrastText: getContrastRatio(redMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
  },
});



export function EditMahasiswa({ data, close }) {
  if (!data) return <p>Data tidak tersedia</p>;

  return (
    <Grid container spacing={2} columns={16}>
       <Grid item xs={8}>
       <div className="container-fluid" style={{ display: 'flex', justifyContent: 'center' }}>
          <FormControl  style={{ margin: '0 auto' }} className='mx-3 w-75'>
          <Typography variant="h1" className='text-danger' gutterBottom>
            Mahasiswa Edit
          </Typography>
          <Typography variant="h1" className='text-danger' gutterBottom>
            <img src='https://k.top4top.io/p_34328chkg0.png' className="mx-auto d-block" style={{width:"200px"}}/>
          </Typography>
          </FormControl>
       </div>
       <br /><br />
       <ThemeProvider theme={theme}>
       <Button variant="outlined" color='red' onClick={close} className='w-100 mx-2'>Close</Button>
       </ThemeProvider>
        </Grid>
        <Grid item xs={8}>
       <div className="container-fluid" style={{ display: 'flex', justifyContent: 'center' }}>
          <FormControl  style={{ margin: 'auto' }} className='mx-3 w-75'>
          <TextField
                id="outlined-textarea"
                name='nama'
                label="Nama lengkap"
                placeholder={data.nama}
                multiline
                variant='standard'
              />
              <TextField
                id="outlined-textarea"
                name='nim'
                label="Nomor Induk Mahasiswa"
                placeholder={data.nim}
                multiline
                variant='standard'
              />
              <TextField
                id="outlined-textarea"
                name='email'
                label="Alamat email"
                placeholder={data.email}
                multiline
                variant='standard'
              />
          </FormControl>
          <FormControl  style={{ margin: 'auto' }} className='mx-3 w-75'>
                <TextField
                id="outlined-textarea"
                name='fakultas'
                label="Fakultas"
                placeholder={data.fakultas}
                multiline
                variant='standard'
              />
                <TextField
                id="outlined-textarea"
                name='prodi'
                label="Program studi"
                placeholder={data.prodi}
                multiline
                variant='standard'
              />
                <TextField
                id="outlined-textarea"
                name='password'
                label="Password"
                placeholder={data.password}
                multiline
                variant='standard'
              />
          </FormControl>
       </div>
       <ThemeProvider theme={theme}>
        <Button variant="contained" color='violet' className='mt-5 w-100 mx-2'>Submit</Button>
       </ThemeProvider>
        </Grid>      
    </Grid>
    
  );
}



