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

}

