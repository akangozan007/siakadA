import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from '../components/AppNavbar';
import Header from '../components/Header';
import MainGrid from '../components/MainGrid';
import SideMenu from '../components/SideMenu';
import AppTheme from '../shared-theme/AppTheme';
import { jwtDecode } from 'jwt-decode';
import axios from "axios";

// admin Mahasiswa
import Mahasiswa from '../components/Mahasiswa';

import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from './theme/customizations';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function AdminMahasiswa(props) {
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState(null);
  const [dashboard, setDashboard] = useState([]);
  const token = localStorage.getItem('token');
 
  // Cek validitas token dan decode
  useEffect(() => {
    if (token && typeof token === "string") {
      try {
        const decoded = jwtDecode(token);

        // Jika token expired, hapus token dan redirect
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
          console.warn("Token expired");
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }

        setDataUser(decoded);
        // console.log("Decoded token:", decoded);
      } catch (error) {
        console.error("Invalid token:", error.message);
        localStorage.removeItem('token');
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [token, navigate]);

  // Ambil data dashboard jika token valid
  useEffect(() => {
    if (!token) return;

    axios.get('http://localhost:8080/api/dashboard', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: false
    })
    .then(response => {
      setDashboard(response.data);
      // console.log(response.data);
    localStorage.setItem('fitur_pengguna', JSON.stringify(response.data['user_data']));
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, [token]);

  if (!token) return null; // Jangan render apapun kalau token tidak ada

  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <AppNavbar />
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            <Mahasiswa />
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
