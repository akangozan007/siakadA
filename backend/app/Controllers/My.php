<?php

namespace App\Controllers;

use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\RESTful\ResourceController;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;


class My extends ResourceController
{
    /**
     * Return an array of resource objects, themselves in array format.
     *
     * @return ResponseInterface
     */
    public function index()
    {
        $kunci = getenv('TOKEN_SECRET');
        $header = $this->request->getServer('HTTP_AUTHORIZATION');
        if (!$header) {
            return $this->failUnauthorized('Token Required');
        }
        $token = explode(' ', $header)[1];
        try {
            $decoded = JWT::decode($token, new Key($kunci, 'HS256'));
            $response = [
                'id'=> $decoded->uid,
                'email'=>$decoded->email
            ];
            $this->respond($response);
        } catch (\Throwable $th) {
           return $this->fail('Invalid Token');
        }
    }

}
