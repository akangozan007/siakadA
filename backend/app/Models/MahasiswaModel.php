<?php

namespace App\Models;

use CodeIgniter\Model;


class MahasiswaModel extends Model
{
    protected $table            = 'mahasiswa';
    protected $primaryKey       = 'mahasiswa_id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = ['nim', 'nama_lengkap', 'jenis_kelamin', 'angkatan'];


    // Di Model MahasiswaModel.php
    public function getMahasiswaFull()
    {
        return $this->db->table('mahasiswa')
            ->select('*')
            ->join('user_account', 'user_account.user_id = mahasiswa.user_id')
            ->join('prodi', 'prodi.prodi_id = mahasiswa.prodi_id')
            ->join('fakultas', 'fakultas.fakultas_id = prodi.fakultas_id')
            ->get()
            ->getResult();
    }
      // Di Model MahasiswaModel.php
    public function getMahasiswaByIdAndMail($id,$email)
    {
          return $this->db->table('mahasiswa')
        //   ambil semua data
              ->select('*')
        // join table account
              ->join('user_account', 'user_account.user_id = mahasiswa.user_id')
        // jika email dan id user 
              ->where('user_account.email',$email)
              ->where('mahasiswa.mahasiswa_id',$id)
        // get hasil 
              ->get()
              ->getResult();
     }





     public function insertMahasiswaFromUser($email, $dataMahasiswa,$oldemail)
     {
         $db = \Config\Database::connect();
     
         // 1. Ambil user berdasarkan email
         $user = $db->table('user_account')
             ->where('email', $oldemail)
             ->get()
             ->getRow();
     
         if (!$user) {
             throw new \Exception("User dengan email $email tidak ditemukan.");
         }
     
         // 2. Ambil prodi berdasarkan nama_prodi
         $prodi = $db->table('prodi')
             ->where('nama_prodi', $dataMahasiswa['nama_prodi'])
             ->get()
             ->getRow();
     
         if (!$prodi) {
             throw new \Exception("Prodi {$dataMahasiswa['nama_prodi']} tidak ditemukan.");
         }
     
         // 3. Ambil fakultas berdasarkan fakultas_id dari prodi
         $fakultas = $db->table('fakultas')
             ->where('fakultas_id', $prodi->fakultas_id)
             ->get()
             ->getRow();
     
         if (!$fakultas) {
             throw new \Exception("Fakultas untuk prodi {$dataMahasiswa['nama_prodi']} tidak ditemukan.");
         }
     
         // 4. Siapkan data mahasiswa
         $mahasiswaData = [
             'user_id'       => $user->user_id,
             'nim'           => $dataMahasiswa['nim'],
             'nama_lengkap'  => $dataMahasiswa['nama_lengkap'],
             'prodi_id'      => $prodi->prodi_id,
         ];
     
         // 5. Siapkan data untuk user_account (email & password)
         $userAccountUpdate = [
             'email'    => $dataMahasiswa['email'],
             'password' => $dataMahasiswa['password'],
         ];
     
         // 6. Cek apakah mahasiswa sudah ada
         $existing = $db->table('mahasiswa')
             ->where('user_id', $user->user_id)
             ->get()
             ->getRow();
     
         if ($existing) {
             // Update mahasiswa
             $db->table('mahasiswa')
                 ->where('user_id', $user->user_id)
                 ->update($mahasiswaData);
     
             // Update akun user (email & password)
             $db->table('user_account')
                 ->where('user_id', $user->user_id)
                 ->update($userAccountUpdate);
     
             return 'updated';
         } else {
             // Insert baru
             $db->table('mahasiswa')->insert($mahasiswaData);
     
             // Update akun user (email & password)
             $db->table('user_account')
                 ->where('user_id', $user->user_id)
                 ->update($userAccountUpdate);
     
             return 'inserted';
         }
     }
     

     
           
}

