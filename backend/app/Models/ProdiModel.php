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
    protected $allowedFields    = ['nama_prodi'];

}