-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 09, 2025 at 01:42 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jsonwebtoken`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `nama_lengkap` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `user_id`, `nama_lengkap`, `phone`) VALUES
(1, 11, 'admin baik', '+6283844335251');

-- --------------------------------------------------------

--
-- Table structure for table `dosen`
--

CREATE TABLE `dosen` (
  `dosen_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `nidn` varchar(20) DEFAULT NULL,
  `nama_lengkap` varchar(100) DEFAULT NULL,
  `gelar` varchar(50) DEFAULT NULL,
  `prodi_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dosen`
--

INSERT INTO `dosen` (`dosen_id`, `user_id`, `nidn`, `nama_lengkap`, `gelar`, `prodi_id`) VALUES
(1, 10, '2008170012', 'Dosen baik', 'S.kom', 1),
(2, 13, '201912301222', 'dosen2 baik banget', 'S.Kom', 1),
(3, 15, '3000000000', 'Dosen 3', 'S.Kom', 1),
(4, 19, '3000000001', 'Dosen 4', 'S.Kom', 1),
(5, 23, '3000000002', 'Dosen 5', 'S.Kom', 1),
(6, 27, '3000000003', 'Dosen 6', 'S.Kom', 1),
(7, 31, '3000000004', 'Dosen 7', 'S.Kom', 1),
(8, 35, '3000000005', 'Dosen 8', 'S.Kom', 1),
(9, 39, '3000000006', 'Dosen 9', 'S.Kom', 1),
(10, 43, '3000000007', 'Dosen 10', 'S.Kom', 1),
(11, 47, '3000000008', 'Dosen 11', 'S.Kom', 1),
(12, 51, '3000000009', 'Dosen 12', 'S.Kom', 1),
(13, 55, '3000000010', 'Dosen 13', 'S.Kom', 1),
(14, 59, '3000000011', 'Dosen 14', 'S.Kom', 1),
(15, 63, '3000000012', 'Dosen 15', 'S.Kom', 1),
(16, 67, '3000000013', 'Dosen 16', 'S.Kom', 1),
(17, 71, '3000000014', 'Dosen 17', 'S.Kom', 1),
(18, 75, '3000000015', 'Dosen 18', 'S.Kom', 1),
(19, 79, '3000000016', 'Dosen 19', 'S.Kom', 1),
(20, 83, '3000000017', 'Dosen 20', 'S.Kom', 1),
(21, 87, '3000000018', 'Dosen 21', 'S.Kom', 1),
(22, 91, '3000000019', 'Dosen 22', 'S.Kom', 1),
(23, 95, '3000000020', 'Dosen 23', 'S.Kom', 1),
(24, 99, '3000000021', 'Dosen 24', 'S.Kom', 1),
(25, 103, '3000000022', 'Dosen 25', 'S.Kom', 1),
(26, 107, '3000000023', 'Dosen 26', 'S.Kom', 1),
(27, 111, '3000000024', 'Dosen 27', 'S.Kom', 1);

-- --------------------------------------------------------

--
-- Table structure for table `fakultas`
--

CREATE TABLE `fakultas` (
  `fakultas_id` int(11) NOT NULL,
  `nama_fakultas` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fakultas`
--

INSERT INTO `fakultas` (`fakultas_id`, `nama_fakultas`) VALUES
(1, 'Sains Teknologi'),
(2, 'Fakultas Ekonomi dan Bisnis'),
(3, 'Fakultas Ilmu Pendidikan'),
(4, 'Fakultas Hukum'),
(5, 'Fakultas Kedokteran'),
(6, 'Fakultas Pertanian'),
(7, 'Fakultas Sains dan Matematika'),
(8, 'Fakultas Ilmu Sosial dan Politik');

-- --------------------------------------------------------

--
-- Table structure for table `mahasiswa`
--

CREATE TABLE `mahasiswa` (
  `mahasiswa_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `nim` varchar(20) DEFAULT NULL,
  `nama_lengkap` varchar(100) DEFAULT NULL,
  `jenis_kelamin` enum('L','P') DEFAULT NULL,
  `angkatan` year(4) DEFAULT NULL,
  `prodi_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mahasiswa`
--

INSERT INTO `mahasiswa` (`mahasiswa_id`, `user_id`, `nim`, `nama_lengkap`, `jenis_kelamin`, `angkatan`, `prodi_id`) VALUES
(1, 9, '2001303137', 'razan', 'L', '2020', 10),
(2, 12, '2001303138', 'mahasiswa1', 'L', '2020', 16),
(4, 14, '2100000000', 'Mahasiswa 4', 'L', '2021', 4),
(5, 18, '2100000001', 'Mahasiswa 5', 'P', '2021', 10),
(6, 22, '2100000002', 'Mahasiswa 6', 'L', '2021', 16),
(7, 26, '2100000003', 'Mahasiswa 7', 'P', '2021', 22),
(8, 30, '2100000004', 'Mahasiswa 8', 'L', '2021', 4),
(9, 34, '2100000005', 'Mahasiswa 9', 'P', '2021', 10),
(10, 38, '2100000006', 'Mahasiswa 10', 'L', '2021', 16),
(11, 42, '2100000007', 'Mahasiswa 11', 'P', '2021', 22),
(12, 46, '2100000008', 'Mahasiswa 12', 'L', '2021', 4),
(13, 50, '2100000009', 'Mahasiswa 13', 'P', '2021', 10),
(14, 54, '2100000010', 'Mahasiswa 14', 'L', '2021', 16),
(15, 58, '2100000011', 'Mahasiswa 15', 'P', '2021', 22),
(16, 62, '2100000012', 'Mahasiswa 16', 'L', '2021', 4),
(17, 66, '2100000013', 'Mahasiswa 17', 'P', '2021', 10),
(18, 70, '2100000014', 'Mahasiswa 18', 'L', '2021', 16),
(19, 74, '2100000015', 'Mahasiswa 19', 'P', '2021', 22),
(20, 78, '2100000016', 'Mahasiswa 20', 'L', '2021', 4),
(21, 82, '2100000017', 'Mahasiswa 21', 'P', '2021', 10),
(22, 86, '2100000018', 'Mahasiswa 22', 'L', '2021', 16),
(23, 90, '2100000019', 'Mahasiswa 23', 'P', '2021', 22),
(24, 94, '2100000020', 'Mahasiswa 24', 'L', '2021', 4),
(25, 98, '2100000021', 'Mahasiswa 25', 'P', '2021', 10),
(26, 102, '2100000022', 'Mahasiswa 26', 'L', '2021', 16),
(27, 106, '2100000023', 'Mahasiswa 27', 'P', '2021', 22),
(28, 110, '2100000024', 'Mahasiswa 28', 'L', '2021', 4);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `version` varchar(255) NOT NULL,
  `class` varchar(255) NOT NULL,
  `group` varchar(255) NOT NULL,
  `namespace` varchar(255) NOT NULL,
  `time` int(11) NOT NULL,
  `batch` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `version`, `class`, `group`, `namespace`, `time`, `batch`) VALUES
(1, '2025-04-28-143558', 'App\\Database\\Migrations\\Users', 'default', 'App', 1745851377, 1);

-- --------------------------------------------------------

--
-- Table structure for table `prodi`
--

CREATE TABLE `prodi` (
  `prodi_id` int(11) NOT NULL,
  `nama_prodi` varchar(100) NOT NULL,
  `warna_prodi` varchar(255) NOT NULL,
  `logo_link_prodi` varchar(255) NOT NULL,
  `jenjang` enum('D3','S1','S2') NOT NULL,
  `fakultas_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prodi`
--

INSERT INTO `prodi` (`prodi_id`, `nama_prodi`, `warna_prodi`, `logo_link_prodi`, `jenjang`, `fakultas_id`) VALUES
(1, 'Teknik Informatika', '', '', 'S2', 1),
(2, 'Sistem Informasi', '', '', 'S1', 1),
(3, 'Teknik Elektro', '', '', 'S1', 1),
(4, 'Teknik Sipil', '', '', 'S1', 1),
(5, 'Teknik Mesin', '', '', 'S1', 1),
(6, 'Manajemen', '', '', 'S1', 2),
(7, 'Akuntansi', '', '', 'S1', 2),
(8, 'Ekonomi Pembangunan', '', '', 'S1', 2),
(9, 'Bisnis Digital', '', '', 'S1', 2),
(10, 'Pendidikan Guru Sekolah Dasar', '', '', 'S1', 3),
(11, 'Pendidikan Anak Usia Dini', '', '', 'S1', 3),
(12, 'Bimbingan dan Konseling', '', '', 'S1', 3),
(13, 'Pendidikan Bahasa Inggris', '', '', 'S1', 3),
(14, 'Ilmu Hukum', '', '', 'S1', 4),
(15, 'Kedokteran Umum', '', '', 'S1', 5),
(16, 'Profesi Dokter', '', '', 'S1', 5),
(17, 'Farmasi', '', '', 'S1', 5),
(18, 'Keperawatan', '', '', 'S1', 5),
(19, 'Agroteknologi', '', '', 'S1', 6),
(20, 'Agribisnis', '', '', 'S1', 6),
(21, 'Teknologi Pangan', '', '', 'S1', 6),
(22, 'Peternakan', '', '', 'S1', 6),
(23, 'Matematika', '', '', 'S1', 7),
(24, 'Kimia', '', '', 'S1', 7);

-- --------------------------------------------------------

--
-- Table structure for table `superadmin`
--

CREATE TABLE `superadmin` (
  `id` int(255) NOT NULL,
  `user_id` int(255) NOT NULL,
  `nama_lengkap` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `superadmin`
--

INSERT INTO `superadmin` (`id`, `user_id`, `nama_lengkap`, `phone`) VALUES
(1, 3, 'Muhammad Razan Rizqullah', '+6289606097937');

-- --------------------------------------------------------

--
-- Table structure for table `user_account`
--

CREATE TABLE `user_account` (
  `user_id` int(5) NOT NULL,
  `email` varchar(100) NOT NULL,
  `profile_photo` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_account`
--

INSERT INTO `user_account` (`user_id`, `email`, `profile_photo`, `role`, `password`) VALUES
(3, 'akangozan007@gmail.com', '', 'superadmin', '$2y$10$vPcFfduWCb1uy72BpI.Bbea6n0dYB2O/JYcT93DxErQGpgYL1rxYK'),
(9, 'razan@gmail.com', '', 'mahasiswa', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(10, 'dosen@gmail.com', '', 'dosen', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(11, 'admin@gmail.com', '', 'admin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(12, 'mahasiswa1@gmail.com', '', 'mahasiswa', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(13, 'dosen2@gmail.com', '', 'dosen', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(14, 'user1@example.com', '', 'mahasiswa', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(15, 'user2@example.com', '', 'dosen', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(16, 'user3@example.com', '', 'admin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(17, 'user4@example.com', '', 'superadmin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(18, 'user5@example.com', '', 'mahasiswa', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(19, 'user6@example.com', '', 'dosen', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(20, 'user7@example.com', '', 'admin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(21, 'user8@example.com', '', 'superadmin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(22, 'user9@example.com', '', 'mahasiswa', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(23, 'user10@example.com', '', 'dosen', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(24, 'user11@example.com', '', 'admin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(25, 'user12@example.com', '', 'superadmin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(26, 'user13@example.com', '', 'mahasiswa', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(27, 'user14@example.com', '', 'dosen', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(28, 'user15@example.com', '', 'admin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(29, 'user16@example.com', '', 'superadmin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(30, 'user17@example.com', '', 'mahasiswa', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(31, 'user18@example.com', '', 'dosen', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(32, 'user19@example.com', '', 'admin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(33, 'user20@example.com', '', 'superadmin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(34, 'user21@example.com', '', 'mahasiswa', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(35, 'user22@example.com', '', 'dosen', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(36, 'user23@example.com', '', 'admin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(37, 'user24@example.com', '', 'superadmin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(38, 'user25@example.com', '', 'mahasiswa', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(39, 'user26@example.com', '', 'dosen', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(40, 'user27@example.com', '', 'admin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(41, 'user28@example.com', '', 'superadmin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(42, 'user29@example.com', '', 'mahasiswa', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(43, 'user30@example.com', '', 'dosen', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(44, 'user31@example.com', '', 'admin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(45, 'user32@example.com', '', 'superadmin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(46, 'user33@example.com', '', 'mahasiswa', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(47, 'user34@example.com', '', 'dosen', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(48, 'user35@example.com', '', 'admin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(49, 'user36@example.com', '', 'superadmin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(50, 'user37@example.com', '', 'mahasiswa', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(51, 'user38@example.com', '', 'dosen', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(52, 'user39@example.com', '', 'admin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(53, 'user40@example.com', '', 'superadmin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(54, 'user41@example.com', '', 'mahasiswa', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(55, 'user42@example.com', '', 'dosen', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(56, 'user43@example.com', '', 'admin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(57, 'user44@example.com', '', 'superadmin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(58, 'user45@example.com', '', 'mahasiswa', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(59, 'user46@example.com', '', 'dosen', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(60, 'user47@example.com', '', 'admin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(61, 'user48@example.com', '', 'superadmin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(62, 'user49@example.com', '', 'mahasiswa', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(63, 'user50@example.com', '', 'dosen', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(64, 'user51@example.com', '', 'admin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(65, 'user52@example.com', '', 'superadmin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(66, 'user53@example.com', '', 'mahasiswa', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(67, 'user54@example.com', '', 'dosen', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(68, 'user55@example.com', '', 'admin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(69, 'user56@example.com', '', 'superadmin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(70, 'user57@example.com', '', 'mahasiswa', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(71, 'user58@example.com', '', 'dosen', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(72, 'user59@example.com', '', 'admin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(73, 'user60@example.com', '', 'superadmin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(74, 'user61@example.com', '', 'mahasiswa', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(75, 'user62@example.com', '', 'dosen', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(76, 'user63@example.com', '', 'admin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(77, 'user64@example.com', '', 'superadmin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(78, 'user65@example.com', '', 'mahasiswa', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(79, 'user66@example.com', '', 'dosen', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(80, 'user67@example.com', '', 'admin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(81, 'user68@example.com', '', 'superadmin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(82, 'user69@example.com', '', 'mahasiswa', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(83, 'user70@example.com', '', 'dosen', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(84, 'user71@example.com', '', 'admin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(85, 'user72@example.com', '', 'superadmin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(86, 'user73@example.com', '', 'mahasiswa', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(87, 'user74@example.com', '', 'dosen', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(88, 'user75@example.com', '', 'admin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(89, 'user76@example.com', '', 'superadmin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(90, 'user77@example.com', '', 'mahasiswa', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(91, 'user78@example.com', '', 'dosen', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(92, 'user79@example.com', '', 'admin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(93, 'user80@example.com', '', 'superadmin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(94, 'user81@example.com', '', 'mahasiswa', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(95, 'user82@example.com', '', 'dosen', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(96, 'user83@example.com', '', 'admin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(97, 'user84@example.com', '', 'superadmin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(98, 'user85@example.com', '', 'mahasiswa', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(99, 'user86@example.com', '', 'dosen', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(100, 'user87@example.com', '', 'admin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(101, 'user88@example.com', '', 'superadmin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(102, 'user89@example.com', '', 'mahasiswa', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(103, 'user90@example.com', '', 'dosen', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(104, 'user91@example.com', '', 'admin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(105, 'user92@example.com', '', 'superadmin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(106, 'user93@example.com', '', 'mahasiswa', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(107, 'user94@example.com', '', 'dosen', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(108, 'user95@example.com', '', 'admin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(109, 'user96@example.com', '', 'superadmin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(110, 'user97@example.com', '', 'mahasiswa', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(111, 'user98@example.com', '', 'dosen', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(112, 'user99@example.com', '', 'admin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(113, 'user100@example.com', '', 'superadmin', '$2y$10$BK3v8UbFY9FNz4YSVxlyoukIyzReCacIZtKqYo4JAbO1c4EuFNPU.'),
(114, 'akangozan008@gmail.com', '', NULL, '$2y$10$YGuIhub2iUilgmijOX4P3.NSwnYSxPxKbLr6c2cz0wVxOZ/Ui6owe');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `dosen`
--
ALTER TABLE `dosen`
  ADD PRIMARY KEY (`dosen_id`),
  ADD UNIQUE KEY `nidn` (`nidn`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `prodi_id` (`prodi_id`);

--
-- Indexes for table `fakultas`
--
ALTER TABLE `fakultas`
  ADD PRIMARY KEY (`fakultas_id`);

--
-- Indexes for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  ADD PRIMARY KEY (`mahasiswa_id`),
  ADD UNIQUE KEY `nim` (`nim`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `prodi`
--
ALTER TABLE `prodi`
  ADD PRIMARY KEY (`prodi_id`),
  ADD KEY `fakultas_id` (`fakultas_id`);

--
-- Indexes for table `superadmin`
--
ALTER TABLE `superadmin`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_account`
--
ALTER TABLE `user_account`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `dosen`
--
ALTER TABLE `dosen`
  MODIFY `dosen_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `fakultas`
--
ALTER TABLE `fakultas`
  MODIFY `fakultas_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  MODIFY `mahasiswa_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `prodi`
--
ALTER TABLE `prodi`
  MODIFY `prodi_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `superadmin`
--
ALTER TABLE `superadmin`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_account`
--
ALTER TABLE `user_account`
  MODIFY `user_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=115;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_account` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `dosen`
--
ALTER TABLE `dosen`
  ADD CONSTRAINT `dosen_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_account` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `dosen_ibfk_2` FOREIGN KEY (`prodi_id`) REFERENCES `prodi` (`prodi_id`);

--
-- Constraints for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  ADD CONSTRAINT `mahasiswa_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_account` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `prodi`
--
ALTER TABLE `prodi`
  ADD CONSTRAINT `prodi_ibfk_1` FOREIGN KEY (`fakultas_id`) REFERENCES `fakultas` (`fakultas_id`) ON DELETE SET NULL;

--
-- Constraints for table `superadmin`
--
ALTER TABLE `superadmin`
  ADD CONSTRAINT `superadmin_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_account` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
