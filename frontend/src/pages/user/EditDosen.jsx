import React, { useState } from 'react';
// component
import { 
  TextField, FormControl, Typography,
  Grid,Button,Select,
  MenuItem
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
// api request post
import { PostDosen } from '../../api/dosen';

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



export function EditDosen({ data, close, Oldemail }) {

  const [fakultas, setFakultas] = useState([]);
  const [prodi, setProdi] = useState([]);
  const [pilFakultas, setPilFakultas] = React.useState('');
  const [pilProdi, setPilProdi] = React.useState('');

   //  data post
      const [formData, setFormData] = useState({});

  // event fakultas
  const handleChangeFK = (event) => {
    setPilFakultas(event.target.value);
  };
  // event prodi
  const handleChangePR = (event) => {
    setPilProdi(event.target.value);
  };

  if (!data) return <p>Data tidak tersedia</p>;

   // post event
   const handleUpdateDsn = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {};

    for (let i = 0; i < form.elements.length; i++) {
      const input = form.elements[i];
      if (input.name) {
        data[input.name] = input.value;

        
        // console.log(data[input.name]);
      }
    }
    setFormData(data);

  }

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
        <form  onSubmit={handleUpdateDsn}>
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
                  name='nidn'
                  label="Nomor Induk Dosen Nasional"
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
                      className='mb-3'
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
        <div className="mx-3 w-100 container-fluid d-inline-block">
                <ThemeProvider theme={theme}>
                  <Button variant="contained" type="submit" color="violet" className="mt-5 mx-2 w-100">
                    Submit
                  </Button>
                </ThemeProvider>
        </div>
        </form>

        <PostDosen onData={formData} onEmail={Oldemail}/>
        </Grid>      
    </Grid>
    
  );
}



