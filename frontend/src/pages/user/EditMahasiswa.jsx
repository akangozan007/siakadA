import React, { useState } from 'react';
// component
import { 
  TextField, FormControl, Typography,
  Grid,Button,Select,
  MenuItem, InputLabel
 } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Optional: untuk komponen JS seperti modal, toast, dsb

import {
  createTheme,
  ThemeProvider,
  alpha,
  getContrastRatio,
} from '@mui/material/styles'


// api request get
import { Fakultas } from '../../api/fakultas';
import { GetProdi } from '../../api/prodi';
// api request post
import { PostMahasiswa } from '../../api/mahasiswa';


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
  const handleUpdateMhs = (e) => {
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


  return (
    <Grid container spacing={2} columns={16}>
  <Fakultas onData={setFakultas} />
  <GetProdi onData={setProdi} />

  <Grid item xs={8}>
    <div className="container-fluid" style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ margin: '0 auto' }} className="mx-3 w-75">
          <Typography variant="h1" className="text-danger" gutterBottom>
            Mahasiswa Edit
          </Typography>
          <Typography variant="h1" className="text-danger" gutterBottom>
            <img
              src="https://k.top4top.io/p_34328chkg0.png"
              className="mx-auto d-block"
              style={{ width: '200px' }}
            />
          </Typography>
        </div>
      </div>
      <br />
      <br />
        <ThemeProvider theme={theme}>
          <Button variant="outlined" color="red" onClick={close} className="w-100 mx-2">
            Close
          </Button>
        </ThemeProvider>
  </Grid>

  <Grid item xs={8}>
    <form  onSubmit={handleUpdateMhs}>
      <div className="container-fluid" style={{ display: 'flex', justifyContent: 'center' }}>
        {/* kolom gambar */}
            <div style={{ margin: 'auto' }} className="mx-3 w-75">
              <TextField
                id="nama"
                name="nama"
                label="Nama lengkap"
                placeholder={data.nama}
                multiline
                variant="standard"
                fullWidth
                margin="normal"
              />
              <TextField
                id="nim"
                name="nim"
                label="Nomor Induk Mahasiswa"
                placeholder={data.nim}
                multiline
                variant="standard"
                fullWidth
                margin="normal"
              />
              <TextField
                id="email"
                name="email"
                label="Alamat email"
                placeholder={data.email}
                multiline
                variant="standard"
                fullWidth
                margin="normal"
              />
          </div>
        {/* kolom teks input */}
          <div style={{ margin: 'auto' }} className="mx-3 w-75 d-block">
          <FormControl fullWidth margin="normal" variant="standard">
            <InputLabel id="fakultas-label">Fakultas</InputLabel>
            <Select
              labelId="fakultas-label"
              id="fakultas"
              value={pilFakultas}
              onChange={handleChangeFK}
              displayEmpty
              name="fakultas"
              inputProps={{ 'aria-label': 'Fakultas' }}
            >
              <MenuItem value="">
                <em>Fakultas</em>
              </MenuItem>
              {fakultas.map((pilihan, index) => (
                <MenuItem key={index} value={pilihan.nama_fakultas}>
                  {pilihan.nama_fakultas}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal" variant="standard">
            <InputLabel id="prodi-label">Prodi</InputLabel>
            <Select
              labelId="prodi-label"
              id="prodi"
              value={pilProdi}
              onChange={handleChangePR}
              displayEmpty
              name="prodi"
              inputProps={{ 'aria-label': 'Prodi' }}
            >
              <MenuItem value="">
                <em>Prodi</em>
              </MenuItem>
              {prodi.map((pilihan, index) => (
                <MenuItem key={index} value={pilihan.nama_prodi}>
                  {pilihan.nama_prodi}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            id="password"
            name="password"
            label="Password"
            placeholder={data.password}
            multiline
            variant="standard"
            fullWidth
            margin="normal"
          />
        </div>
      </div>
      <div className="mx-3 w-100 container-fluid d-inline-block">
        <ThemeProvider theme={theme}>
          <Button variant="contained" type="submit" color="violet" className="mt-5 mx-2 w-100">
            Submit
          </Button>
        </ThemeProvider>
        </div>
    </form>
    
    <PostMahasiswa onData={formData} />
  </Grid>
</Grid>

  );
}



