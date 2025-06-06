import * as React from 'react';
import { useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from '../user/internals/components/Copyright';
import ChartProdiByMahasiswa from './ChartProdiByMahasiswa';
import ChartProdiByDosen from './ChartProdiByDosen';
import CustomizedTreeView from './CustomizedTreeView';
import MahasiswaDataGrid from './MahasiswaDataGrid';
import DosenDataGrid from './DosenDataGrid';
import StatCard from './StatCard';
import axios from 'axios';




export default function DosenMahasiswa() {
  const [jumlahFakultas, setJumlahFakultas] = useState(0);
  const [jumlahProdi, setJumlahProdi] = useState(0);
  const [jumlahMahasiswa, setJumlahMahasiswa] = useState(0);
  const [jumlahDosen, setJumlahDosen] = useState(0);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [fakultasRes, prodiRes, mahasiswaRes, dosenRes] = await Promise.all([
          axios.get('http://localhost:8080/api/fakultas', { headers }),
          axios.get('http://localhost:8080/api/prodi', { headers }),
          axios.get('http://localhost:8080/api/mahasiswa', { headers }),
          axios.get('http://localhost:8080/api/dosen', { headers }),
        ]);

      // Simpan data jika perlu di localStorage
      localStorage.setItem('fakultasData', JSON.stringify(fakultasRes.data));
      localStorage.setItem('prodiData', JSON.stringify(prodiRes.data));
      localStorage.setItem('mahasiswaData', JSON.stringify(mahasiswaRes.data));
      localStorage.setItem('dosenData', JSON.stringify(dosenRes.data));

      // Hitung jumlah
      setJumlahFakultas(fakultasRes.data.length || 0);

      // Ambil jumlah prodi dari message[0].data_prodi
      setJumlahProdi(prodiRes.data?.message?.[0]?.data_prodi?.length || 0);

      // Ambil jumlah mahasiswa dari message[1].prodi
      setJumlahMahasiswa(mahasiswaRes.data?.[1]?.mahasiswa?.length || 0);

      // Untuk dosen, tergantung struktur response-nya (tidak kamu lampirkan),
      // misalnya jika struktur seperti: { message: [ { dosen: [...] } ] }
      setJumlahDosen(dosenRes.data?.[0]?.all?.length || 0); // atau sesuaikan
  
      } catch (err) {
        console.error("Gagal fetch data:", err);
      }
    };

    fetchAllData();
  }, [token]);

  const data = [
    {
      title: 'Jumlah Fakultas',
      value: `${jumlahFakultas}`,
      interval: 'Last 30 days',
      trend: 'up',
      data: [...Array(30)].map(() => Math.floor(Math.random() * 100 + 200)), // contoh dummy chart
    },
    {
      title: 'Jumlah Prodi',
      value: `${jumlahProdi}`,
      interval: 'Last 30 days',
      trend: 'down',
      data: [...Array(30)].map(() => Math.floor(Math.random() * 1000)),
    },
    {
      title: 'Jumlah Mahasiswa',
      value: `${jumlahMahasiswa}`,
      interval: 'Last 30 days',
      trend: 'neutral',
      data: [...Array(30)].map(() => Math.floor(Math.random() * 600)),
    },
    {
      title: 'Jumlah Dosen',
      value: `${jumlahDosen}`,
      interval: 'Last 30 days',
      trend: 'neutral',
      data: [...Array(30)].map(() => Math.floor(Math.random() * 600)),
    },
  ];

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Kontrol User Mahasiswa
      </Typography>

      <Grid container spacing={2} columns={12} sx={{ mb: 2 }}>
        {data.map((card, index) => (
          <Grid key={index} item xs={12} sm={6} lg={3}>
            <StatCard {...card} />
          </Grid>
        ))}
      </Grid>

      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        List User Mahasiswa
      </Typography>

      <Grid container spacing={2} columns={12}>
        <Grid item xs={12} lg={9}>
          <MahasiswaDataGrid />
        </Grid>
        <Grid item xs={12} lg={6} md={6}>
          <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
            <ChartProdiByMahasiswa totalData={jumlahMahasiswa} />
          </Stack>
        </Grid>
      </Grid>

      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        List User Dosen
      </Typography>

      <Grid container spacing={2} columns={12}>
        <Grid item xs={12} lg={9}>
          <DosenDataGrid />
        </Grid>
        <Grid item xs={12} lg={6} md={6}>
          <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
            <CustomizedTreeView />
            <ChartProdiByDosen totalData={jumlahDosen} />
          </Stack>
        </Grid>
      </Grid>

      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}