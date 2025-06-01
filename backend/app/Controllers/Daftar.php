<?php

namespace App\Controllers;

use CodeIgniter\HTTP\ResponseInterface;
use App\Models\UserModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;

class Daftar extends ResourceController
{
    /**
     * Return an array of resource objects, themselves in array format.
     *
     * @return ResponseInterface
     */
    use ResponseTrait;
    public function index()
    {
        //controller daftar
        helper(['form']);
        $rules = [
            'email'=>'required|is_unique[user_account.email]',
            'password'=>'required|min_length[6]',
            'confpassword'=>'matches[password]'
        ];
        if(!$this->validate($rules)) return $this->fail($this->validator->getErrors());
        $data = [
          'email'=> $this->request->getVar('email'),
          'password'=> password_hash($this->request->getVar('password'), PASSWORD_BCRYPT),
        ];

        $model = new UserModel();
        $terdaftar = $model->save($data);
        $this->respondCreated($terdaftar);

    }


}
