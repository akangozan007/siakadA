import React, { useState } from 'react';
// component
import { 
  TextField, FormControl, Typography,
  Grid,Button,Select,
  MenuItem,InputLabel
 } from '@mui/material';
//  bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Optional: untuk komponen JS seperti modal, toast, dsb
// tema warna
import {
  createTheme,
  ThemeProvider,
  alpha,
  getContrastRatio,
} from '@mui/material/styles'


// api request
import { Fakultas } from '../../api/fakultas';
import { GetProdi } from '../../api/prodi';

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



export function EditDosen({ data, close }) {

  const [fakultas, setFakultas] = useState([]);
  const [prodi, setProdi] = useState([]);
  const [pilFakultas, setPilFakultas] = React.useState('');
  const [pilProdi, setPilProdi] = React.useState('');

  // event fakultas
  const handleChangeFK = (event) => {
    setPilFakultas(event.target.value);
  };
  // event prodi
  const handleChangePR = (event) => {
    setPilProdi(event.target.value);
  };

  if (!data) return <p>Data tidak tersedia</p>;

  console.log("ini data dari api fakultas", fakultas);
  return (
    <Grid container spacing={2} columns={16}>
       <Fakultas onData={setFakultas} />
       <GetProdi onData={setProdi} />

       <Grid item xs={8}>
       <div className="container-fluid" style={{ display: 'flex', justifyContent: 'center' }}>
          <FormControl  style={{ margin: '0 auto' }} className='mx-3 w-75'>
          <Typography variant="h1" className='text-danger' gutterBottom>
           Dosen Edit
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
                placeholder={data.nidn}
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
          <FormControl  style={{ margin: 'auto' }} variant='standard' className='mx-3 w-75'>
                  <Select
                    labelId="demo-simple-select-standard-label1"
                    id="demo-simple-select-standard1"
                    value={pilFakultas}
                    label="Fakultas"
                    onChange={handleChangeFK}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Fakultas' }}
                  >
                    <MenuItem value="">
                        <em>Fakultas</em>
                    </MenuItem>
                    {fakultas.map((pilihan, index)=>(
                         <MenuItem key={index} value={pilihan.nama_fakultas}>{pilihan.nama_fakultas}</MenuItem>
                    ))}
                  </Select>
                  <Select
                    labelId="demo-simple-select-standard-label2"
                    id="demo-simple-select-standard2"
                    value={pilProdi}
                    label="Prodi"
                    onChange={handleChangePR}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Prodi' }}
                  >
                      <MenuItem value="">
                        <em>Prodi</em>
                      </MenuItem>
                    {prodi.map((pilihan, index)=>(
                         <MenuItem key={index} value={pilihan.nama_prodi}>{pilihan.nama_prodi}</MenuItem>
                    ))}
                  </Select>
            

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



