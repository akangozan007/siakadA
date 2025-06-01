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

}