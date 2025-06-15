<?php

namespace App\Controllers;

use CodeIgniter\HTTP\ResponseInterface;
use App\Models\MahasiswaModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Mahasiswa extends ResourceController
{
    use ResponseTrait;
    public function getMahasiswa()
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
                // data khusus table mahasiswa
                $mahasiswaModel = new MahasiswaModel();
                $data['all'] = $mahasiswaModel->findAll();
                // data innerJoin 
                $sqlMahasiswaAll = new MahasiswaModel();
                $data2['mahasiswa'] = $sqlMahasiswaAll->getMahasiswaFull();
                $data = [$data, $data2];
                // return $this->respond($data, 200);
                return $this->respond($data, 200);

            }else {
                return $this->respond(['message'=>'Anda tidak berhak mengakses informasi ini'], 403);
            }
            
           } catch (\Throwable $th) {
            //throw $th;
           }

         
    }

    // get mahasiswa by email and id
    public function getMahasiswaByEmailAndID()
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
                // get data masuk
                $userID = $this->request->getvar("id");
                $userEmail = $this->request->getvar("email");
                // memanggil model
                $mahasiswaModel = new MahasiswaModel();
                // menyisipkan function model sesuai kebutuhan data
                $data = $mahasiswaModel->getMahasiswaByIdAndMail($userID,$userEmail);
                // return hasil
                return $this->respond(['message'=>$data], 200);

            }else {
                return $this->respond(['message'=>'Anda tidak berhak mengakses informasi ini'], 403);
            }
            
           } catch (\Throwable $th) {
            //throw $th;
           }

         
    }





    public function postMahasiswaByEmailAndID()
    {
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
            $secretKey = getenv('TOKEN_SECRET');
            if (!$secretKey) {
                return $this->respond(['message' => 'Token secret belum dimasukkan'], ResponseInterface::HTTP_INTERNAL_SERVER_ERROR);
            }
    
            $decoded = JWT::decode($jwtToken, new Key($secretKey, 'HS256'));
    
            if ($decoded->role == "admin") {
    
                // ✅ Gunakan getJSON() untuk membaca data JSON
                $json = $this->request->getJSON();
    
                $userEmail     = $json->email;
                $userNama      = $json->nama_lengkap;
                $userNim       = $json->nim;
                $userPwd       = $json->password;
                $userProdi     = $json->nama_prodi;
                $userFakultas  = $json->nama_fakultas;
                $userOldEmail = $json->oldemail;
    
                $dataMahasiswa = [
                    "email"        => $userEmail,
                    "nama_lengkap" => $userNama,
                    "nim"          => $userNim,
                    "password"          => $userPwd,
                    "nama_prodi"        => $userProdi,
                    "nama_fakultas"     => $userFakultas,
                ];
    
                $mahasiswamodel = new MahasiswaModel();
                $data = $mahasiswamodel->insertMahasiswaFromUser($userEmail, $dataMahasiswa,$userOldEmail);
    
                return $this->respond(['message' => $data], 200);
    
            } else {
                return $this->respond(['message' => 'Anda tidak berhak mengakses informasi ini'], 403);
            }
    
        } catch (\Throwable $th) {
            return $this->respond(['message' => 'Terjadi kesalahan: ' . $th->getMessage()], 500);
        }
    }




    

}