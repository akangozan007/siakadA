import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { Backdrop } from '@mui/material';
import axios from 'axios';
import { EditDosen } from '../user/EditDosen';
import { createTheme } from '@mui/material/styles';

export default function DosenDataGrid() {
  const [rows, setRows] = useState([]);
  // dom open close edit mahasiswa
    const [OpenEditDosen, setOpenEditDosen] = useState(false,[]);
  // dom open close edit mahasiswa
    const [OpenDataDosen, setOpenDataDosen] = useState(null);

  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(getPageSize(window.innerWidth));

  // Fungsi untuk menyesuaikan pageSize berdasar lebar layar
  function getPageSize(width) {
    if (width < 600) return 5;
    if (width < 900) return 10;
    if (width < 1200) return 20;
    return 50;
  }
  // tombol warna

  useEffect(() => {
    async function getAllDosen() {


      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:8080/api/dosen', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const dosenAllData = response.data;
        localStorage.setItem('dosenAllData', JSON.stringify(dosenAllData));

        const rowsData = dosenAllData[1].dosen.map((dsn) => ({
          id: dsn.dosen_id,
          nidn: dsn.nidn,
          nama: dsn.nama_lengkap,
          email: dsn.email,
          prodi: dsn.nama_prodi,
          fakultas: dsn.nama_fakultas,
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

    getAllDosen();

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
    { field: 'nidn', headerName: 'NIDN', flex: 1, minWidth: 100 },
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

    setOpenDataDosen(row);
    setOpenEditDosen(true);
  };
  
  const handleCloseDsn = () => {
    setOpenEditDosen(!OpenEditDosen);
    setOpenDataDosen(!OpenDataDosen);
  };


  const handleHapus = (row) => {
    console.log('Hapus clicked for:', row);
  };

  if (loading) return <div>Loading...</div>;

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
        open={OpenEditDosen}
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi transparan hitam
        }}
      >
      <EditDosen data={OpenDataDosen} close={handleCloseDsn} />
    </Backdrop>

    </>
  );
}
