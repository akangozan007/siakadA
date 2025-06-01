<?php

namespace App\Models;

use CodeIgniter\Model;


class FakultasModel extends Model
{
    protected $table            = 'fakultas';
    protected $primaryKey       = 'fakultas_id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = ['nama_fakultas'];

}