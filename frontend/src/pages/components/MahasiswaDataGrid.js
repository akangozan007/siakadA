import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import axios from 'axios';
import { createTheme } from '@mui/material/styles';
import { EditMahasiswa }  from '../user/EditMahasiswa';
import { Box } from '@mui/system';
import { Backdrop } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Optional: untuk komponen JS seperti modal, toast, dsb
// import { Box } from '@mui/material';


export default function MahasiswaDataGrid() {
// dom open close edit mahasiswa
  const [OpenEditMahasiswa, setOpenEditMahasiswa] = useState(false,[]);
// dom open close edit mahasiswa
  const [OpenDataMahasiswa, setOpenDataMahasiswa] = useState(null);

  // get user old Email
  const [ oldEmail, setOldEmail ] = useState(null);

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(getPageSize(window.innerWidth));
  


  // Fungsi untuk menyesuaikan pageSize berdasar lebar layar
  function getPageSize(width) {
    if (width < 600) return 5;
    if (width < 900) return 10;
    if (width < 1200) return 20;
    return 50;
  }

  

  useEffect(() => {
    async function getAllMahasiswa() {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:8080/api/mahasiswa', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const mahasiswaAllData = response.data;
        localStorage.setItem('mahasiswaAllData', JSON.stringify(mahasiswaAllData));

        const rowsData = mahasiswaAllData[1].mahasiswa.map((mhs) => ({
          id: mhs.mahasiswa_id,
          nim: mhs.nim,
          nama: mhs.nama_lengkap,
          email: mhs.email,
          prodi: mhs.nama_prodi,
          fakultas: mhs.nama_fakultas,
          edit:<Button variant="outlined" color="secondary">Edit</Button>,
          hapus:<Button variant="outlined" color="error">Hapus</Button>
        }));

        setRows(rowsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getAllMahasiswa();

    const handleResize = () => {
      setPageSize(getPageSize(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // warna tombol

  const theme = createTheme({
    palette: {
      edit: {
        light: '#2196f3',
        main: '#2196f3',
        dark: '#0b79d0',
        contrastText: '#fff',
      },
      delete: {
        light: '#f50057',
        main: '#f44336',
        dark: '#d32f2f',
        contrastText: '#fff',
      },
    },
  });
  

  const columns = [
    {
      field: 'no',
      headerName: 'No',
      width: 70,
      renderCell: (params) => params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
    },
    { field: 'nim', headerName: 'NIM', flex: 1, minWidth: 100 },
    { field: 'nama', headerName: 'Nama Lengkap', flex: 1.5, minWidth: 150 },
    { field: 'email', headerName: 'Email', flex: 1.5, minWidth: 200 },
    { field: 'prodi', headerName: 'Program Studi', flex: 1, minWidth: 150 },
    { field: 'fakultas', headerName: 'Fakultas', flex: 1, minWidth: 150 },
    {
      field: 'edit',
      headerName: 'Edit',
      flex: 1,
      minWidth: 100,
      renderCell:(params) => (
        <Button
          variant="outlined"
          sx={{
            color: theme.palette.edit.light,
            borderColor: theme.palette.edit.light,
            '&:hover': {
              backgroundColor: theme.palette.edit.light,
              color: '#fff',
            },
          }}
          onClick={() => handleEdit(params.row)}
        >
          Edit
        </Button>
      )
    },
    {
      field: 'hapus',
      headerName: 'Hapus',
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <Button
          variant="outlined"
          sx={{
            color: theme.palette.delete.light,
            borderColor: theme.palette.delete.light,
            '&:hover': {
              backgroundColor: theme.palette.delete.light,
              color: '#fff',
            },
          }}
          onClick={() => handleHapus(params.row)}
        >
          Hapus
        </Button>
      )
    },
  ];
  const handleEdit = (row) => {
    console.log('Edit clicked for:', row);
    console.log('Type of row:', typeof row);
    console.log('Keys in row:', Object.keys(row));
    console.log('row.id:', row.id);
    console.log("email user : ", row.email);
    setOpenDataMahasiswa(row);
    setOpenEditMahasiswa(true);
    // set oldemail
    setOldEmail(row.email);
    
  };

  const handleCloseMhs = () => {
    setOpenEditMahasiswa(!OpenEditMahasiswa);
    setOpenDataMahasiswa(!OpenDataMahasiswa);
  };

  const handleHapus = (row) => {
    console.log('Hapus clicked for:', row);
  };
  
  if (loading) return <div>Loading...</div>;
  // warna tombol



  return (
    // tabel mahasiswa
    <>
    <div style={{ width: '100%' }} className='my-5'>
      <DataGrid
        autoHeight
        checkboxSelection
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newSize) => setPageSize(newSize)}
        rowsPerPageOptions={[5, 10, 20, 50]}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
        disableColumnResize
        density="compact"
      />
    </div>
    {/* backdrop form editMahasiswa */}
    <Backdrop
        open={OpenEditMahasiswa}
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi transparan hitam
        }}
      >
      <EditMahasiswa data={OpenDataMahasiswa} Oldemail={oldEmail} close={handleCloseMhs} />
    </Backdrop>

      <Box>

      </Box>
    </>
  );
}
