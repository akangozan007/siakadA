<?php

namespace App\Controllers;

use App\Models\UserModel;
use App\Models\AdminModel;
use App\Models\DosenModel;
use App\Models\MahasiswaModel;
use App\Models\SuperAdminModel;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\HTTP\ResponseInterface;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class User extends ResourceController
{
    use ResponseTrait;

    public function index()
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
            // Ambil secret key dari .env
            $secretKey = getenv('TOKEN_SECRET');
            if (!$secretKey) {
                return $this->respond(['message' => 'Token secret is not set'], ResponseInterface::HTTP_INTERNAL_SERVER_ERROR);
            }

            // Decode token JWT
            $decoded = JWT::decode($jwtToken, new Key($secretKey, 'HS256'));

            // Cari user berdasarkan email
            $userModel = new UserModel();
            $user = $userModel->where('email', $decoded->email)->first();

            if (!$user) {
                return $this->respond(['message' => 'User tidak ditemukan'], ResponseInterface::HTTP_UNAUTHORIZED);
            }

            $roleData = null;
            $roleFitur = [];
            log_message('debug', 'ROLE YANG DITERIMA: ' . $user['role']);
            switch ($user['role']) {
                case 'superadmin':
                    $roleData = (new SuperAdminModel())->where('user_id', $user['user_id'])->first();
                    $roleFitur = [
                        'Manajemen User'=> [
                            [
                                ['labelmenu'=>'user'],
                                ['link'=>'/user/aturuser']
                            ],
                            [
                                ['labelmenu'=>'reset password massal'],
                                ['link'=>'/user/reset-massal']
                            ],
                        ],
                        'Manajemen Data Master'=>[
                            [
                                ['labelmenu'=>'fakultas'],
                                ['link'=>'/user/fakultas']
                            ],
                            [
                                ['labelmenu'=>'prodi'],
                                ['link'=>'/user/prodi']
                            ],
                            [
                                ['labelmenu'=>'kelas'],
                                ['link'=>'/user/kelas']
                            ],
                            [
                                ['labelmenu'=>'mata kuliah'],
                                ['link'=>'/user/matkul']
                            ],
                            [
                                ['labelmenu'=>'dosen'],
                                ['link'=>'/user/dosen']
                            ],
                            [
                                ['labelmenu'=>'tahun semester akademik'],
                                ['link'=>'/user/semesakademik']
                            ],
                            [
                                ['labelmenu'=>'kurikulum'],
                                ['link'=>'/user/kurikulum']
                            ],
                        ],
                        'Kontrol Sistem'=>[
                            [
                                ['labelmenu'=>'Status KRS'],
                                ['link'=>'/user/KRS']
                            ],
                            [
                                ['labelmenu'=>'Periode Pembayaran'],
                                ['link'=>'/user/periode-pembayaran']
                            ],
                            [
                                ['labelmenu'=>'Backup Data'],
                                ['link'=>'/user/backup-data']
                            ],
                            [
                                ['labelmenu'=>'Pengumuman Kampus'],
                                ['link'=>'/user/pengumuman']
                            ],
                            [
                                ['labelmenu'=>'Homepage Settings'],
                                ['link'=>'/user/homepage-settings']
                            ],
                        ],
                        'Monitoring & Laporan'=>
                            [
                                [
                                    ['labelmenu'=>'Statistik'],
                                    ['link'=>'/user/statistik']
                                ],
                                [
                                    ['labelmenu'=>'Keuangan'],
                                    ['link'=>'/user/keuangan']
                                ],
                                [
                                    ['labelmenu'=>'Backup Data'],
                                    ['link'=>'/user/backup-data']
                                ],
                                [
                                    ['labelmenu'=>'Pengumuman Kampus'],
                                    ['link'=>'/user/pengumuman']
                                ],
                                [
                                    ['labelmenu'=>'Homepage Settings'],
                                    ['link'=>'/user/homepage-settings']
                                ],
                                [
                                    ['labelmenu'=>'Akademik'],
                                    ['link'=>'/user/akademik']
                                ],
                                [
                                    ['labelmenu'=>'Log User'],
                                    ['link'=>'/user/log-user']
                                ],
                            ],
                        'Notifikasi & Broadcast'=>
                        [
                            [
                                ['labelmenu'=>'Log User'],
                                ['link'=>'/user/log-user']
                            ],
                            [
                                ['labelmenu'=>'notifikasi global'],
                                ['link'=>'/user/global-notif']
                            ],
                        ]
                        
                    ];
                    break;

                case 'admin':
                    $roleData = (new AdminModel())->where('user_id', $user['user_id'])->first();
                    $roleFitur = [
                                'Manajemen Data Mahasiswa'=>[
                                    [
                                        ['labelmenu'=>'Mahasiswa'],
                                        ['link'=>'/user/admin/mahasiswa']
                                    ],
                                    [
                                        ['labelmenu'=>'Kartu'],
                                        ['link'=>'/user/admin/kartu'],
                                    ]
                                ],
                                'Manajemen KRS'=>
                                    [
                                        [
                                            ['labelmenu'=>'Verifikasi'],
                                            ['link'=>'/user/admin/verifikasi'],
                                        ],
                                        [
                                            ['labelmenu'=>'Kelas'],
                                            ['link'=>'/user/admin/kelas'],
                                        ],
                                        [
                                            ['labelmenu'=>'Jadwal'],
                                            ['link'=>'/user/admin/jadwal'],
                                        ]
                                    ],
                                'Manajemen Nilai & KHS'=>[
                                    [
                                        ['labelmenu'=>'Cetak'],
                                        ['link'=>'/user/admin/jadwal']
                                    ],
                                    [
                                        ['labelmenu'=>'Edit'],
                                        ['link'=>'/user/admin/Edit']
                                    ]
                                , ],
                                'Manajemen Pembayaran'=>
                                [
                                    [
                                        ['labelmenu'=>'Verifikasi'],
                                        ['link'=>'/user/admin/verPembayaran']
                                    ],
                                    [
                                        ['labelmenu'=>'Generate'],
                                        ['link'=>'/user/admin/genPembayaran']
                                    ],
                                    [
                                        ['labelmenu'=>'Status Pembayaran'],
                                        ['link'=>'/user/admin/statPembayaran']
                                    ]
                                ],
                                'Pengajuan Administrasi'=>
                                [
                                    [
                                        ['labelmenu'=>'Verfikasi'],
                                        ['link'=>'/user/admin/verAdministrasi']
                                    ],
                                    [
                                        ['labelmenu'=>'Approval'],
                                        ['link'=>'/user/admin/appAdministrasi']
                                    ]
                                ],
                                'Manajemen Absensi & Kehadiran'=>
                                [
                                    [
                                        ['labelmenu'=>'Rekap',],
                                        ['link'=>'/user/admin/rekapAbsen']
                                    ],
                                    [
                                        ['labelmenu'=>'Cetak'],
                                        ['link'=>'/user/admin/cetAbsen']
                                    ]
                                ],
                                'Komunikasi & Notifikasi'=>
                                [
                                    [
                                        ['labelmenu'=>'Pesan'],
                                        ['link'=>'/user/admin/Pesan']
                                    ],
                                    [
                                        ['Info Penting'],
                                        ['link'=>'/user/admin/infoPenting']
                                    ]
                                    
                                ],
                                'Laporan'=>
                                    [
                                        [
                                            ['labelmenu'=>'Data Mahasiswa'],
                                            ['link'=>'/user/admin/laporan-data-mahasiswa']
                                        ],
                                        [
                                            ['labelmenu'=>'Nilai'],
                                            ['link'=>'/user/admin/nilaiMahasiswa']
                                        ],
                                        [
                                            ['labelmenu'=>'Kelulusan'],
                                            ['link'=>'/user/admin/kelulusanMahasiswa']
                                        ],
                                        [
                                            ['labelmenu'=>'keuangan'],
                                            ['link'=>'/user/admin/Keungan']
                                        ]
                                    ]
                                ];
                    break;

                case 'dosen':
                    $roleData = (new DosenModel())->where('user_id', $user['user_id'])->first();
                    $roleFitur = [
                        'Manajemen Perkuliahan'=>
                            [
                                [
                                    ['labelmenu'=>'Mata Kuliah'],
                                    ['link'=>'/user/dosen/matakuliah']
                                ],
                                
                                [
                                    ['labelmenu'=>'Jadwal'],
                                    ['link'=>'/user/dosen/jadwalDosen']
                                ],
                                
                                [
                                    ['labelmenu'=>'Materi'],
                                    ['link'=>'/user/dosen/materiDosen']
                                ],
                                
                                [
                                    ['labelmenu'=>'Tugas'],
                                    ['link'=>'/user/dosen/tugasDosen']
                                ],
                                
                                [
                                    ['labelmenu'=>'Forum Diskusi'],
                                    ['link'=>'/user/dosen/forumDiskusi']
                                ],
                            ],
                        'Manajemen Nilai'=>
                            [
                                [
                                    ['labelmenu'=>'Nilai'],
                                    ['link'=>'/user/dosen/NilaiMatkul']
                                ],
                                [
                                    ['labelmenu'=>'rekap'],
                                    ['link'=>'/user/dosen/rekapNilai']
                                ],
                            ],
                        'Absensi Mahasiswa'=>
                            [
                                [
                                    ['labelmenu'=>'Kehadiran Mahasiswa'],
                                    ['link'=>'/user/dosen/RekapAbsen']
                                ]
                            ],
                        'Bimbingan Skripsi/Tugas Akhir'=>
                            [
                                [
                                    ['labelmenu'=>'Mahasiswa'],
                                    ['link'=>'/user/dosen/bimMahasiswa']
                                ],
                                [
                                    ['labelmenu'=>'log'],
                                    ['link'=>'/user/dosen/bimLog']
                                ],
                                [
                                    ['labelmenu'=>'revisi'],
                                    ['link'=>'/user/dosen/revBim']
                                ],
                            ],
                        'Notifikasi & Komunikasi'=>
                            [
                                [
                                    ['labelmenu'=>'pengumuman'],
                                    ['link'=>'/user/dosen/pengumuman']
                                ],
                                [
                                    ['labelmenu'=>'tugas'],
                                    ['link'=>'/user/dosen/tugas']
                                ],
                                [
                                    ['labelmenu'=>'forum'],
                                    ['link'=>'/user/dosen/forum']
                                ],
                            ],  
                        'Laporan Akademik'=>
                            [
                                [
                                    ['labelmenu'=>'Rekap nilai kelas'],
                                    ['link'=>'/user/dosen/rekapKelasNilai']
                                ],
                                [
                                    ['labelmenu'=>'rekap kehadiran mahasiswa'],
                                    ['link'=>'/user/dosen/rekapHadirMahasiswa']
                                ]
                            ]
                    ];
                    break;

                case 'mahasiswa':
                    $roleData = (new MahasiswaModel())->where('user_id', $user['user_id'])->first();
                    $roleFitur = [
                        'akun',
                        'krs' => 
                            [
                                [
                                    ['labelmenu'=>'ambil kartu rencana studi'],
                                    ['link'=>'/user/mahasiswa/krs']
                                ], 
                                [
                                    ['labelmenu'=> 'jadwal kuliah'],
                                    ['link'=>'/user/mahasiswa/jadwal-kuliah']
                                ], 
                            ],
                        'khs' =>
                         [
                            [
                                ['labelmenu'=> 'nilai'],
                                ['link'=>'/user/mahasiswa/nilai']
                            ], 
                            [
                                ['labelmenu'=> 'IPK'],
                                ['link'=>'/user/mahasiswa/ipk']
                            ], 
                            [
                                ['labelmenu'=> 'IPS'],
                                ['link'=>'/user/mahasiswa/IPS']
                            ], 
                         ],
                        'transkip akademik'=>'/user/mahasiswa/transkip-nilai',
                        'jadwal' => 
                            [
                               [
                                    ['labelmenu'=>'mata kuliah'],
                                    ['link'=>'/user/mahasiswa/matkul']
                                ],
                                [
                                    ['labelmenu'=>'UTS'],
                                    ['link'=>'/user/mahasiswa/UTS']
                                ],
                                [
                                    ['labelmenu'=>'UAS'],
                                    ['link'=>'/user/mahasiswa/UAS']
                                ]
                            ],
                        'absensi' => 
                            [
                                [
                                    ['labelmenu'=>'rekap kehadiran'],
                                    ['link'=>'/user/mahasiswa/rekap-kehadiran']
                                ],
                                [
                                    ['labelmenu'=>'notifikasi kehadiran'],
                                    ['link'=>'/user/mahasiswa/notif-kehadiran']
                                ],
                            ],
                        'informasi akademik' => 
                            [
                                [
                                    ['labelmenu'=>'pengumuman'],
                                    ['link'=>'/user/mahasiswa/notif-kehadiran']
                                ],
                                [
                                    ['labelmenu'=>'deadline administrasi'],
                                    ['link'=>'/user/mahasiswa/deadline-administrasi']
                                ]
                            ],
                        'pembayaran/tagihan' => 
                        [
                            [
                                ['labelmenu'=>'UKT'],
                                ['link'=>'/user/mahasiswa/ukt']
                            ],
                            [
                                ['labelmenu'=>'SPP'],
                                ['link'=>'/user/mahasiswa/spp']
                            ],
                            [
                                ['labelmenu'=>'UPLOAD'],
                                ['link'=>'/user/mahasiswa/upload']
                            ],
                            [
                                ['labelmenu'=>'verifikasi'],
                                ['link'=>'/user/mahasiswa/verifikasi']
                            ]
                        ],
                        'bimbingan' => 
                        [
                            [
                                ['labelmenu'=>'daftar pembimbing'],
                                ['link'=>'/user/mahasiswa/pebimbing']
                            ],
                            [
                                ['labelmenu'=> 'unggah proposal'],
                                ['link'=>'/user/mahasiswa/unggah-proposal']
                            ],
                            [
                                ['labelmenu'=>'log bimbingan'],
                                ['link'=>'/user/mahasiswa/log-bimbingan']
                            ],
                            [
                                ['labelmenu'=> 'verifikasi'],
                                ['link'=>'/user/mahasiswa/verifikasi-bimbingan']
                            ]
                        ],
                        'pengajuan' => 
                        [
                            [
                                ['labelmenu'=>'surat aktif kuliah'],
                                ['link'=>'/user/mahasiswa/surat-aktif-kuliah']
                            ],
                            [
                                ['labelmenu'=> 'cuti akademik'],
                                ['link'=>'/user/mahasiswa/cutiAkademik']
                            ],
                            [
                                ['labelmenu'=>'kelas/jadwal'],
                                ['link'=>'/user/mahasiswa/kelas-jadwal']
                            ]
                        ],
                        'forum'=>['link'=>'/user/mahasiswa/forum']
                    ];
                    break;

                default:
                    return $this->respond(['message' => 'Role tidak dikenali'], ResponseInterface::HTTP_FORBIDDEN);
            }

            if (!$roleData) {
                return $this->respond(['message' => 'Data role tidak ditemukan'], ResponseInterface::HTTP_NOT_FOUND);
            }

            $data = [
                'message' => 'Kunci valid',
                'user_data' => [
                    'nama_lengkap' => $roleData['nama_lengkap'],
                    'email' => $user['email'],
                    'role' => $user['role'],
                    'user_id' => $user['user_id'],
                    'fitur' => $roleFitur
                ],
            ];

            return $this->respond($data, ResponseInterface::HTTP_OK);

        } catch (\Exception $e) {
            return $this->respond([
                'message' => 'Token tidak valid',
                'error' => $e->getMessage()
            ], ResponseInterface::HTTP_UNAUTHORIZED);
        }
    }
}
