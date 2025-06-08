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
          <FormControl  style={{ margin: '0 auto' }}>
          <Typography variant="h1" className='text-danger d-none-sm' gutterBottom>
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
          <FormControl  style={{ margin: '0 auto' }}>
              <TextField name="nama" id="standard-basic" label="Nama Lengkap" variant="standard" className='m-3'/>
              <TextField name="nim" id="standard-basic" label="NIM" variant="standard" className='m-3'/>
              <TextField name="email" id="standard-basic" label="Email" variant="standard" className='m-3'/>
          </FormControl>
          <FormControl  style={{ margin: '0 auto' }}>
              <TextField name="fakultas" id="standard-basic" label="Fakultas" variant="standard" className='m-3'/>
              <TextField name="prodi" id="standard-basic" label="Program Studi" variant="standard" className='m-3'/>
              <TextField name="password" id="standard-basic" label="Password" variant="standard" className='m-3'/>
          </FormControl>
       </div>
       <ThemeProvider theme={theme}>
        <Button variant="contained" color='violet' className='w-100 mx-2'>Submit</Button>
       </ThemeProvider>
        </Grid>
        {/* <p>{data.nama}</p>
        <p>{data.nim}</p>
        <p>{data.email}</p> */}
      
    </Grid>
    
  );
}