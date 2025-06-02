import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from '../user/internals/components/Copyright';
import ChartUserByCountry from './ChartUserByCountry';
import CustomizedTreeView from './CustomizedTreeView';
import MahasiswaDataGrid from './MahasiswaDataGrid';
import DosenDataGrid from './DosenDataGrid';
import HighlightedCard from './HighlightedCard';
import PageViewsBarChart from './PageViewsBarChart';
import SessionsChart from './SessionsChart';
import StatCard from './StatCard';
import axios from 'axios';

// get data prodi
let prodiData = localStorage.getItem('prodiData');

async function getProdi() {
  let token = localStorage.getItem('token');

  try {
    const response = await axios.get('http://localhost:8080/api/prodi', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    prodiData = response.data;
    console.log('Data Prodi:', prodiData);
    localStorage.setItem('prodiData', JSON.stringify(prodiData));
  } catch (error) {
    console.error(error);
  }
}

getProdi();

// console.log(JSON.stringify(fakultasData));
prodiData = JSON.parse(localStorage.getItem('prodiData') || '[]');
// console.log(fakultasData.length);
let jumlahProdi = prodiData.length;


// get data mahasiswa
let mahasiswaData = localStorage.getItem('mahasiswaData');

async function getMahasiswa() {
  let token = localStorage.getItem('token');

  try {
    const response = await axios.get('http://localhost:8080/api/mahasiswa', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    mahasiswaData = response.data;
    console.log('Data Mahasiswa:', mahasiswaData);
    localStorage.setItem('mahasiswaData', JSON.stringify(mahasiswaData));
  } catch (error) {
    console.error(error);
  }
}

getMahasiswa();


// console.log(JSON.stringify(fakultasData));
mahasiswaData = JSON.parse(localStorage.getItem('mahasiswaData') || '[]');
// console.log(fakultasData.length);
let jumlahMahasiswa = mahasiswaData.length;


// get data fakultas
let dosenData = localStorage.getItem('dosenData');

async function getDosen() {
  let token = localStorage.getItem('token');

  try {
    const response = await axios.get('http://localhost:8080/api/dosen', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    dosenData = response.data;
    console.log('Data Dosen:', dosenData);
    localStorage.setItem('dosenData', JSON.stringify(dosenData));
  } catch (error) {
    console.error(error);
  }
}

getDosen();
// console.log(JSON.stringify(fakultasData));
dosenData = JSON.parse(localStorage.getItem('dosenData') || '[]');
// console.log(fakultasData.length);
let jumlahDosen = dosenData.length;

// get data dosen

let fakultasData = localStorage.getItem('fakultasData');

async function getFakultas() {
  let token = localStorage.getItem('token');

  try {
    const response = await axios.get('http://localhost:8080/api/fakultas', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    fakultasData = response.data;
    console.log('Data Fakultas:', fakultasData);
    localStorage.setItem('fakultasData', JSON.stringify(fakultasData));
  } catch (error) {
    console.error(error);
  }
}

getFakultas();
// console.log(JSON.stringify(fakultasData));
fakultasData = JSON.parse(localStorage.getItem('fakultasData') || '[]');
// console.log(fakultasData.length);
let jumlahFakultas = fakultasData.length;


const data = [
  {
    title: 'Jumlah Fakultas',
    value: `${jumlahFakultas}`,
    interval: 'Last 30 days',
    trend: 'up',
    data: [
      200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340, 380,
      360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
    ],
  },
  {
    title: 'Jumlah Prodi',
    value: `${jumlahProdi}`,
    interval: 'Last 30 days',
    trend: 'down',
    data: [
      1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600, 820,
      780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400, 360, 300, 220,
    ],
  },
  {
    title: 'Jumlah Mahasiswa',
    value: `${jumlahMahasiswa}`,
    interval: 'Last 30 days',
    trend: 'neutral',
    data: [
      500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510, 530,
      520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 510,
    ],
  },
  {
    title: 'Jumlah Dosen',
    value: `${jumlahDosen}`,
    interval: 'Last 30 days',
    trend: 'neutral',
    data: [
      500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510, 530,
      520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 510,
    ],
  },
];

export default function DosenMahasiswa() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Kontrol User Mahasiswa
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {data.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))}
      </Grid>
      {/* List user Mahasiswa */}

      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
         List User Mahasiswa
       </Typography>     
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <MahasiswaDataGrid />
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
            <CustomizedTreeView />
            <ChartUserByCountry />
          </Stack>
        </Grid>
      </Grid>
     {/* List user Dosen */}
     <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
         List User Dosen
       </Typography>     
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <DosenDataGrid />
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
            <CustomizedTreeView />
            <ChartUserByCountry />
          </Stack>
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
