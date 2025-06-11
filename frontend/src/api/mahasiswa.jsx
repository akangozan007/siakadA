import { useEffect } from 'react';
import axios from 'axios';

let token = localStorage.getItem('token');

export function PostMahasiswa({ onData }) {

    let nama, email, nim, fakultas, prodi, pwd;
    nama = onData.nama;
    email = onData.email;
    nim = onData.nim;
    fakultas = onData.fakultas;
    prodi = onData.prodi;
    pwd = onData.password;


  useEffect(() => {
    if (onData !== null) {
      const postData = async () => {
        try {

          const response = await axios.post(
            'http://localhost:8080/api/mahasiswaUpdate',
            {
              "email": email,
              "nama_lengkap": nama,
              "nim": nim,
              "nama_fakultas": fakultas,
              "nama_prodi": prodi,
              "password": pwd,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data === null ) {
            console.log("menunggu data");
          }else{
            console.log("✅ Data berhasil dikirim:", response.data);
          }
          
          // bisa panggil notifikasi, atau set state berhasil
        } catch (error) {
          console.error("❌ Gagal mengirim data:", error);
          // bisa kasih feedback ke user juga
        }
      };

      postData(); // panggil fungsi async
    }
  }, [onData]); // only trigger saat onData berubah
}
