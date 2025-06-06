<?php
// file khusus testing uploader MERN Stack React CI4

namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;

class Upload extends ResourceController
{
    public function postFile()
    {
        $file = $this->request->getFile('file');

        if ($file && $file->isValid() && !$file->hasMoved()) {
            $newName = $file->getRandomName();
            $file->move(ROOTPATH . 'public/uploads', $newName);

            return $this->respond([
                'status' => 'success',
                'file_name' => $newName,
                'url' => base_url("uploads/" . $newName),
            ]);
        }

        return $this->fail('File upload gagal.');
    }
}
