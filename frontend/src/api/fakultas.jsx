import { useEffect } from 'react';
import axios from 'axios';

let token = localStorage.getItem('token');

export function Fakultas({ onData }) {
    
    useEffect(() => {
      axios.get('http://localhost:8080/api/fakultas',{
        headers:{
            'Authorization':`Bearer ${token}`
        }
      })
        .then(response => {
        // console.log(response.data);
          onData(response.data); // kirim ke parent
        })
        .catch(error => {
          console.error(error);
        });
    }, []);
}


