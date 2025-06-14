<?php

namespace App\Controllers;

use CodeIgniter\HTTP\ResponseInterface;
use App\Models\FakultasModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Fakultas extends ResourceController
{
    use ResponseTrait;
    public function getFakultas()
    {

           // Ambil token dari header Authorization
           $authHeader = $this->request->getServer('HTTP_AUTHORIZATION');
           if (!$authHeader) {
               return $this->respond(['message' => 'Authorization header not found'], ResponseInterface::HTTP_UNAUTHORIZED);
           }
   
           $tokenParts = explode(' ', $authHeader);
           if (count($tokenParts) !== 2 || $tokenParts[0] !== 'Bearer') {
               return $this->respond(['message' => 'Invalid token format'], ResponseInterface::HTTP_UNAUTHORIZED);
           }

           $jwtToken = $tokenParts[1];

           try {
            //code...
            // Ambil secret key dari .env
            $secretKey = getenv('TOKEN_SECRET');
            if (!$secretKey) {
                return $this->respond(['message' => 'Token secret belum dimasukkan'], ResponseInterface::HTTP_INTERNAL_SERVER_ERROR);
            }

            // Decode token JWT
            $decoded = JWT::decode($jwtToken, new Key($secretKey, 'HS256'));

            if ($decoded->role == "admin") {
                    # code...
                
                $fakultasModel = new FakultasModel();
                $data = $fakultasModel->findAll();

                // return $this->respond($data, 200);
                return $this->respond($data, 200);

            }else {
                return $this->respond(['message'=>'Anda tidak berhak mengakses informasi ini'], 403);
            }
            
           } catch (\Throwable $th) {
            //throw $th;
           }

         
    }

}