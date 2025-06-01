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
          action: 'edit',
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
