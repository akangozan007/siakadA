import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from '../pages/home/home';
import Login from '../pages/login/Login';
import Daftar from '../pages/daftar/Daftar';
import User from '../pages/user/User';
import Loader from '../loader/Loader';
import Account from '../pages/user/Account';
import '../loader/Loader.css';
import { AuthProvider } from '../contexts/AuthContext';
import { jwtDecode } from 'jwt-decode';
import Debug from '../pages/user/Debug';
// fitur admin
import AdminMahasiswa from '../pages/user/adminMahasiswa';


export default function AppRoutes() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    // Tampilkan loader setiap kali lokasi berubah
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 800); 

    return () => clearTimeout(timeout);
  }, [location]);

  // get token to take role data
  
  let userData = localStorage.getItem('token');
  userData = jwtDecode(userData);

 

  
  // admin routes
  if (userData.role === 'admin') {
    return (
      <>
        {loading && <Loader />}
        <AuthProvider >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/daftar" element={<Daftar />} />
          <Route path="/user" element={<User />} />
          <Route path="/user/akun" element={<Account />} />
          <Route path="/user/admin/mahasiswa" element={<AdminMahasiswa />} />
        </Routes>
        </AuthProvider>
      </>
    );
  }else if (userData.role === 'superadmin') {
    return (
    <>
    {loading && <Loader />}
    <AuthProvider >
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/daftar" element={<Daftar />} />
      <Route path="/user" element={<User />} />
      <Route path="/user/akun" element={<Account />} />
      <Route path="/user/admin/mahasiswa" element={<Debug />} />
    </Routes>
    </AuthProvider>
  </>
    );
  }else{
    return (
      <>
        {loading && <Loader />}
        <AuthProvider >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/daftar" element={<Daftar />} />
          <Route path="/user" element={<User />} />
          <Route path="/user/akun" element={<Account />} />
          {/* <Route path="/user/admin/mahasiswa" element={<Debug />} /> */}
        </Routes>
        </AuthProvider>
      </>
    );
  }

}

  // superadmin routes

  // mahasiswa routes

  // dosen routes
