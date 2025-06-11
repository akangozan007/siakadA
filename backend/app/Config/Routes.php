<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index', ['filter' => 'auth']);
// daftar req
// $routes->post('/api/daftar', 'Daftar::index');
// $routes->post('/api/login', 'Login::index');
$routes->options('/api/login', function () {
    return response()->setStatusCode(200);
}, ['filter' => 'cors']);

$routes->options('/api/daftar', function () {
    return response()->setStatusCode(200);
}, ['filter' => 'cors']);
$routes->options('/api/dashboard', function () {
    return response()->setStatusCode(200);
}, ['filter' => 'cors']);

// fitur admin
$routes->options('/api/fakultas', function () {
    return response()->setStatusCode(200);
}, ['filter' => 'cors']);

$routes->options('/api/prodi', function () {
    return response()->setStatusCode(200);
}, ['filter' => 'cors']);

$routes->options('/api/mahasiswa', function () {
    return response()->setStatusCode(200);
}, ['filter' => 'cors']);

$routes->options('/api/mahasiswaUpdate', function () {
    return response()->setStatusCode(200);
}, ['filter' => 'cors']);

// $routes->options('/api/postMahasiswaByEmailAndID', function () {
//     return response()->setStatusCode(200);
// }, ['filter' => 'cors']);


$routes->options('/api/dosen', function () {
    return response()->setStatusCode(200);
}, ['filter' => 'cors']);

$routes->options('/api/prodi', function () {
    return response()->setStatusCode(200);
}, ['filter' => 'cors']);

$routes->options('/api/upload', function () {
    return response()->setStatusCode(200);
}, ['filter' => 'cors']);

// Tambahkan filter CORS pada rute yang memerlukan akses dari frontend React
$routes->post('/api/daftar', 'Daftar::index', ['filter' => 'cors']);
$routes->post('/api/login', 'Login::index', ['filter' => 'cors']);
$routes->get('/api/dashboard', 'User::index', ['filter' => 'cors']);

// fitur admin
$routes->get('/api/fakultas', 'Fakultas::getFakultas', ['filter' => 'cors']);
$routes->get('/api/prodi', 'Prodi::getProdi', ['filter' => 'cors']);
$routes->get('/api/mahasiswa', 'Mahasiswa::getMahasiswa', ['filter' => 'cors']);
$routes->post('/api/mahasiswaUpdate', 'Mahasiswa::postMahasiswaByEmailAndID', ['filter' => 'cors']);

$routes->get('/api/dosen', 'Dosen::getDosen', ['filter' => 'cors']);
$routes->post('/api/upload', 'Upload::postFile', ['filter' => 'cors']);


// user mahasiswa by id and email
$routes->get('/api/mahasiswaByIdEmail', 'Mahasiswa::getMahasiswaByEmailAndID', ['filter' => 'cors']);



// unit testing upload
$routes->post('/api/login', 'Login::index', ['filter' => 'cors']);

// -------- DASHBOARD (butuh token) ----------
$routes->group('/api', ['filter' => 'auth'], static function ($routes) {
    $routes->get('/dashboard', 'User::index');   // GET /api/dashboard
    $routes->get('/fakultas', 'Fakultas::getFakultas'); // Get /api/fakultas
    $routes->get('/mahasiswa', 'Mahasiswa::getMahasiswa'); // Get /api/mahasiswa
    $routes->get('/mahasiswaByIdEmail', 'Mahasiswa::getMahasiswaByEmailAndID'); // Get /api/mahasiswaByIdEmail
    $routes->get('/dosen', 'Dosen::getDosen'); // Get /api/dosen
    $routes->get('/prodi', 'Dosen::getProdi'); // Get /api/prodi
    $routes->post('/upload', 'Dosen::getProdi'); // Get /api/prodi
    // post
    $routes->post('/mahasiswaUpdate', 'Mahasiswa::postMahasiswaByEmailAndID'); // Get /api/prodi
});


    
