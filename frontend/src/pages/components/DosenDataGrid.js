import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

export default function MahasiswaDataGrid() {
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
          action: 'edit',
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
    { field: 'action', headerName: 'Aksi', flex: 1, minWidth: 100 },
  ];

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
    </>
  );
}
