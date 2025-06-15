import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Skeleton, Alert, Box, Typography } from '@mui/material';
import { cyan, pink } from '@mui/material/colors';

const berhasil = cyan[500];
const gagal = pink[900];

const token = localStorage.getItem('token');

export function PostDosen({ onData, onEmail }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null); // null = belum dikirim, true = berhasil, false = gagal

  useEffect(() => {
    const postData = async () => {
      setLoading(true);
      setSuccess(null);

      try {
        const response = await axios.post(
          'http://localhost:8080/api/dosenUpdate',
          {
            email: onData.email,
            nama_lengkap: onData.nama,
            nidn: onData.nidn,
            nama_fakultas: onData.fakultas,
            nama_prodi: onData.prodi,
            password: onData.password,
            oldemail:onEmail
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data) {
          console.log("✅ Data berhasil dikirim:", response.data);
          setSuccess(true);
        } else {
          setSuccess(false);
        }
      } catch (error) {
              console.error("❌ Gagal mengirim data:", error);
              setSuccess(false);
            } finally {
              setLoading(false);
            }
          };
      
          if (onData && Object.keys(onData).length > 0) {
            postData();
          }
        }, [onData]);
      
        return (
          <Box sx={{ mt: 2 }}>
            {loading && (
              <Box>
                <Skeleton variant="rectangular" width="100%" height={50} />
                <Skeleton variant="text" />
                <Skeleton variant="text" width="60%" />
              </Box>
            )}
      
            {!loading && success === true && (
                 <Box
                 sx={{
                   mt: 2,
                   p: 2,
                   border: '2px solid',
                   borderColor: berhasil,
                   color: berhasil,
                   borderRadius: 1,
                 }}
               >
                 ✅ Data berhasil dikirim!
               </Box>
            )}
      
            {!loading && success === false && (
           <Box
              sx={{
                mt: 2,
                p: 2,
                border: '2px solid',
                borderColor: gagal,
                color: gagal,
                borderRadius: 1,
              }}
            >
              ❎ Data Belum terkirim!
             </Box>
            )}
          </Box>
        );
}
