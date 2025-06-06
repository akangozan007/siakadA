<?php

namespace App\Models;

use CodeIgniter\Model;


class ProdiModel extends Model
{
    protected $table            = 'prodi';
    protected $primaryKey       = 'prodi_id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = ['nama_prodi', 'jenjang'];

    // Inner Join Table prodi dan mahasiswa
    public function getProdiFull()
    {
        return $this->db->table('prodi')
            ->select('*')
            ->join('mahasiswa', 'mahasiswa.prodi_id = prodi.prodi_id')
            ->get()
            ->getResult();
    }

    public function getProdiByName()
    {
        return $this->db->table('prodi')
        ->select('prodi.nama_prodi, COUNT(mahasiswa.mahasiswa_id) AS total_mahasiswa')
        ->join('mahasiswa', 'mahasiswa.prodi_id = prodi.prodi_id', 'left')
        ->groupBy('prodi.prodi_id')
        ->get()
        ->getResult();
    }
}