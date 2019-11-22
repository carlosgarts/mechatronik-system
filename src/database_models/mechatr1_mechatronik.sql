-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 04, 2019 at 07:09 AM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mechatr1_mechatronik`
--

-- --------------------------------------------------------

--
-- Table structure for table `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `titulo` varchar(150) COLLATE utf8_bin NOT NULL,
  `descripcion` text COLLATE utf8_bin DEFAULT NULL,
  `imagen` varchar(150) COLLATE utf8_bin DEFAULT NULL,
  `active` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `categorias`
--

INSERT INTO `categorias` (`id`, `titulo`, `descripcion`, `imagen`, `active`) VALUES
(1, 'Rotorex', 'Rotorex Chapman es la marca lider en rotores de su clase', 'https://s19540.pcdn.co/wp-content/uploads/2018/09/brakerotors.png', 1),
(2, 'Motores Chevetex', 'Motores que sirven para el verdadero trabajo ssd', 'https://motores-electricos.com.ar/wp-content/uploads/2017/06/simotics-gp-05-1-1024x585.jpg', 1),
(3, 'Motores electricos', 'Motores Electricos ideales para electronica', 'https://previews.123rf.com/images/shaffandi/shaffandi1404/shaffandi140400098/27398286-motor-electr%C3%B3nico-aislado-en-fondo-blanco.jpg', 1),
(4, 'Ganma Ray', 'Ganma ray is the future of technology invention dfd sdsdd', 'https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-award-medium/s3/gama.png?itok=IerSzwxV', 0),
(5, 'Casval Sum', 'Casval sum Deikun es la empresa mas popular en produccion de mechas de la historia', 'https://otakuhouse.com/images/2012/07/kuratas.png', 1);

-- --------------------------------------------------------

--
-- Table structure for table `marcas`
--

CREATE TABLE `marcas` (
  `id` int(11) NOT NULL,
  `titulo` varchar(150) COLLATE utf8_bin NOT NULL,
  `descripcion` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `imagen` varchar(150) COLLATE utf8_bin DEFAULT NULL,
  `active` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `marcas`
--

INSERT INTO `marcas` (`id`, `titulo`, `descripcion`, `imagen`, `active`) VALUES
(1, 'Neugart', 'Empresa aliada de Mechatronika inc', 'https://neugart.com/fileadmin/_processed_/c/8/csm_Product-Filter-Banner_01_6c2d01eb00.jpg', 1),
(2, 'Zimm', 'Marca aliada de mechatronik', 'http://www.austechindustrial.com.au/wp-content/uploads/product-large/zimm-screwjacks-l.jpg', 0);

-- --------------------------------------------------------

--
-- Table structure for table `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(150) COLLATE utf8_bin NOT NULL,
  `modelo` varchar(150) COLLATE utf8_bin DEFAULT NULL,
  `descripcion` text COLLATE utf8_bin DEFAULT NULL,
  `especificaciones` text COLLATE utf8_bin DEFAULT NULL,
  `aplicaciones` text COLLATE utf8_bin DEFAULT NULL,
  `folleto` varchar(150) COLLATE utf8_bin DEFAULT NULL,
  `fotos` text COLLATE utf8_bin DEFAULT NULL,
  `active` int(11) DEFAULT 1,
  `marcas_id` int(11) NOT NULL,
  `categorias_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `modelo`, `descripcion`, `especificaciones`, `aplicaciones`, `folleto`, `fotos`, `active`, `marcas_id`, `categorias_id`) VALUES
(2, 'Producto 1 edit', 'modelo 1', 'medelo de propducto', 'Fuerza;20N;Velocidad;25Kmh', 'Ventilacion aerodinamica', 'https://vida.com', 'https://frasesparami.com/wp-content/uploads/2017/06/imagenes-chidas-para-facebook.jpg https://frasesparami.com/wp-content/uploads/2017/06/imagenes-chidas-para-facebook.jpg', 1, 2, 5),
(3, 'producto 2', '002', 'sdgfsdfsdfsd', 'rapidez;45N;agilidad;25Kmh', 'Algunas aplicaciones eficientes', 'https://eleonor.com/una.pdf', 'fotos1 fotos2', 1, 1, 3),
(4, 'producto 3', '001', 'Un producto mas de prueba', 'Tension;15;Afinidad;25;detreza;12', 'aplicaciones aqui', 'http://www.orimi.com/pdf-test.pdf', '', 1, 1, 5);

-- --------------------------------------------------------

--
-- Table structure for table `servicios`
--

CREATE TABLE `servicios` (
  `id` int(11) NOT NULL,
  `titulo` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `descripcion` text COLLATE utf8_bin DEFAULT NULL,
  `fotos` text COLLATE utf8_bin DEFAULT NULL,
  `active` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `soluciones`
--

CREATE TABLE `soluciones` (
  `id` int(11) NOT NULL,
  `titulo` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `descripcion` text COLLATE utf8_bin DEFAULT NULL,
  `fotos` text COLLATE utf8_bin DEFAULT NULL,
  `active` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('BDmBzI21rKQctw9jbev836S1SWxHBGKb', 1570062066, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('JjxMwKKMarpyVYqoqx1WRir2M5fYRKVV', 1570062297, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('PVqcLOOVm2QVEmhPfsNiqy3ga6QbHhCE', 1570062295, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('jYf4OS8U75KnouMahWmCdsMFzK12SkFv', 1570062295, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('rnZ0zNrB-6dYoLpYwDF778NgM3c9nCS6', 1570071450, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":1}}'),
('yxtY34kcuqzUUh4k_uJHF_ZfUzbjvbFN', 1570124199, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":1}}');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(16) COLLATE utf8_bin NOT NULL,
  `password` varchar(60) COLLATE utf8_bin NOT NULL,
  `fullname` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `fullname`) VALUES
(1, 'admin', '$2a$10$fxSALmQeQbMnUhtNSd7WLO05wjgYRXQs68otI25TKn4RlBJvc1/VG', 'Jhon Doe');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `marcas`
--
ALTER TABLE `marcas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `fk_productos_marcas_idx` (`marcas_id`),
  ADD KEY `fk_productos_categorias1_idx` (`categorias_id`);

--
-- Indexes for table `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `soluciones`
--
ALTER TABLE `soluciones`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `marcas`
--
ALTER TABLE `marcas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `servicios`
--
ALTER TABLE `servicios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

ALTER TABLE `marcas` ADD `logo` VARCHAR(150) NULL DEFAULT NULL AFTER `descripcion`;

--
-- Constraints for table `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `fk_productos_categorias1` FOREIGN KEY (`categorias_id`) REFERENCES `categorias` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_productos_marcas` FOREIGN KEY (`marcas_id`) REFERENCES `marcas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
