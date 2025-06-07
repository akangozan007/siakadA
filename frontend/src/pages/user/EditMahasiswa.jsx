import React from 'react'
import Box from '@mui/material/Box';

function EditMahasiswa({data}) {
  return (
    <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
    This Box renders as an HTML section { data }
    </Box>
  )
}

export default EditMahasiswa
