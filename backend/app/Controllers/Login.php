<?php

namespace App\Controllers;

use App\Models\UserModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\RESTful\ResourceController;
use Firebase\JWT\JWT;

class Login extends ResourceController
{
    use ResponseTrait;

    public function index()
    {
        helper(['form']);

        // Validasi input email dan password
        $rules = [
            'email'    => 'required|valid_email',
            'password' => 'required|min_length[6]',
        ];

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors(), 400);
        }

        $email = $this->request->getVar('email');
        $password = $this->request->getVar('password');

        $model = new UserModel();
        $user = $model->where('email', $email)->first();

        // Jika user tidak ditemukan
        if (!$user) {
            return $this->failNotFound('Email tidak terdaftar.');
        }

        // Verifikasi password
        if (!password_verify($password, $user['password'])) {
            return $this->fail('Password salah.', 401);
        }

        // Jika sukses login
        $response = [
            'status' => 200,
            'message' => 'Login berhasil.',
            'data' => [
                'email' => $user['email'],
                'password' => $user['password'],
                'role'=>$user['role'],
            ]
        ];
        // JWT
        $key = getenv('TOKEN_SECRET');
        $payload = [
            'iat' => 1356999524,
            'nbf' => 1357000000,
            'uid' => $user['user_id'],
            'email'=> $user['email'],
            'role'=> $user['role']
        ];
        $usertoken = JWT::encode($payload, $key, 'HS256');

        // return $this->respond($response, 200);
        return $this->respond($usertoken);
    }
}
