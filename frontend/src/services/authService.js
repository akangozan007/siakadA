import axios from 'axios';

const API_URL = 'http://localhost:8080/api/login'; // Ganti dengan URL API kamu

export async function login(data) {
  try {
    const response = await axios.post(API_URL, data);
    // Menangani response dari server
    console.log('Login berhasil:', response.data);
    console.log(response.data); // Kembalikan data dari server, misalnya token atau user
  } catch (error) {
    // Menangani error jika login gagal
    console.error('Login gagal:', error.response ? error.response.data : error);
    throw error; // Bisa throw error untuk ditangani di tempat lain
  }
}
