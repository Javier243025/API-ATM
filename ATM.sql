-- --------------------------------------------------------
-- Host:                         0.tcp.sa.ngrok.io
-- Versión del servidor:         10.4.32-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.7.0.6850
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para cuentabancaria
CREATE DATABASE IF NOT EXISTS `cuentabancaria` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `cuentabancaria`;

-- Volcando estructura para tabla cuentabancaria.cuentabancaria
CREATE TABLE IF NOT EXISTS `cuentabancaria` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `numeroCuenta` varchar(20) NOT NULL,
  `saldo` decimal(10,2) NOT NULL,
  `titular` varchar(100) NOT NULL,
  `tarjetaDebito` varchar(20) NOT NULL,
  `claveTarjeta` varchar(255) NOT NULL,
  `correoElectronico` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla cuentabancaria.cuentabancaria: ~2 rows (aproximadamente)
INSERT INTO `cuentabancaria` (`id`, `numeroCuenta`, `saldo`, `titular`, `tarjetaDebito`, `claveTarjeta`, `correoElectronico`) VALUES
	(1, '1001', 414.00, 'John Doe', '1234-5678-9012-3456', '7777', 'cixotab439@stikezz.com'),
	(2, '1002', 0.00, 'Jane Smith', '9876-5432-1098-7654', 'Hola&&&', 'jane.smith@example.com');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
