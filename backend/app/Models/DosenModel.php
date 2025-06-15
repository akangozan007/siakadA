<?php

namespace App\Models;

use CodeIgniter\Model;


class DosenModel extends Model
{
    protected $table            = 'dosen';
    protected $primaryKey       = 'dosen_id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = ['nidn', 'nama_lengkap', 'gelar'];

    // Di Model DosenModel.php
    public function getDosenFull()
    {
        return $this->db->table('dosen')
            ->select('*')
            ->join('user_account', 'user_account.user_id = dosen.user_id')
            ->join('prodi', 'prodi.prodi_id = dosen.prodi_id')
            ->join('fakultas', 'fakultas.fakultas_id = prodi.fakultas_id')
            ->get()
            ->getResult();
    }

          // Di Model MahasiswaModel.php
          public function getDosenByIdAndMail($id,$email)
          {
                return $this->db->table('dosen')
              //   ambil semua data
                    ->select('*')
              // join table account
                    ->join('user_account', 'user_account.user_id = dosen.user_id')
              // jika email dan id user 
                    ->where('user_account.email',$email)
                    ->where('dosen.dosen_id',$id)
              // get hasil 
                    ->get()
                    ->getResult();
           }

           public function insertDosenFromUser($email, $dataDosen,$oldemail)
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
                   ->where('nama_prodi', $dataDosen['nama_prodi'])
                   ->get()
                   ->getRow();
           
               if (!$prodi) {
                   throw new \Exception("Prodi {$dataDosen['nama_prodi']} tidak ditemukan.");
               }
           
               // 3. Ambil fakultas berdasarkan fakultas_id dari prodi
               $fakultas = $db->table('fakultas')
                   ->where('fakultas_id', $prodi->fakultas_id)
                   ->get()
                   ->getRow();
           
               if (!$fakultas) {
                   throw new \Exception("Fakultas untuk prodi {$dataDosen['nama_prodi']} tidak ditemukan.");
               }
           
               // 4. Siapkan data mahasiswa
               $dosenData = [
                   'user_id'       => $user->user_id,
                   'nidn'           => $dataDosen['nidn'],
                   'nama_lengkap'  => $dataDosen['nama_lengkap'],
                   'prodi_id'      => $prodi->prodi_id,
               ];
           
               // 5. Siapkan data untuk user_account (email & password)
               $userAccountUpdate = [
                   'email'    => $dataDosen['email'],
                   'password' => $dataDosen['password'],
               ];
           
               // 6. Cek apakah mahasiswa sudah ada
               $existing = $db->table('dosen')
                   ->where('user_id', $user->user_id)
                   ->get()
                   ->getRow();
           
               if ($existing) {
                   // Update mahasiswa
                   $db->table('dosen')
                       ->where('user_id', $user->user_id)
                       ->update($dosenData);
           
                   // Update akun user (email & password)
                   $db->table('user_account')
                       ->where('user_id', $user->user_id)
                       ->update($userAccountUpdate);
           
                   return 'updated';
               } else {
                   // Insert baru
                   $db->table('mahasiswa')->insert($dosenData);
           
                   // Update akun user (email & password)
                   $db->table('user_account')
                       ->where('user_id', $user->user_id)
                       ->update($userAccountUpdate);
           
                   return 'inserted';
               }
           }

}