import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { columns, rows } from '../user/internals/data/gridData';
import axios from 'axios';

// get complex data mahasiswa
let mahasiswaAllData = localStorage.getItem('mahasiswaAllData');

async function getAllMahasiswa() {
  let token = localStorage.getItem('token');

  try {
    const response = await axios.get('http://localhost:8080/api/mahasiswa', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    mahasiswaAllData = response.data;
    console.log('Data Semua Mahasiswa:', mahasiswaAllData);
    localStorage.setItem('mahasiswaAllData', JSON.stringify(mahasiswaAllData));
  } catch (error) {
    console.error(error);
  }
}

getAllMahasiswa();



export default function MahasiswaDataGrid() {
  return (
    <DataGrid
      checkboxSelection
      rows={rows}
      columns={columns}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
      }}
      pageSizeOptions={[10, 20, 50]}
      disableColumnResize
      density="compact"
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: 'outlined',
              size: 'small',
            },
            columnInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            operatorInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: 'outlined',
                size: 'small',
              },
            },
          },
        },
      }}
    />
  );
}
