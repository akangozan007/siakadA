import { useEffect } from 'react';
import axios from 'axios';

let token = localStorage.getItem('token');

export function GetProdi({ onData }) {
    
    useEffect(() => {
      axios.get('http://localhost:8080/api/prodi',{
        headers:{
            'Authorization':`Bearer ${token}`
        }
      })
        .then(response => {
        // console.log('prodi.jsx respons : ',response.data["message"][0].data_prodi);
          let data = response.data["message"][0].data_prodi; 
          onData(data); // kirim ke parent
        })
        .catch(error => {
          console.error(error);
        });
    }, []);
}


