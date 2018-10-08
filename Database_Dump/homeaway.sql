-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.1.73-community - MySQL Community Server (GPL)
-- Server OS:                    Win32
-- HeidiSQL Version:             9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for homeaway
CREATE DATABASE IF NOT EXISTS `homeaway` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `homeaway`;

-- Dumping structure for table homeaway.amenities
CREATE TABLE IF NOT EXISTS `amenities` (
  `propertyId` int(11) NOT NULL,
  `amenity` varchar(50) NOT NULL,
  PRIMARY KEY (`propertyId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table homeaway.amenities: ~0 rows (approximately)
/*!40000 ALTER TABLE `amenities` DISABLE KEYS */;
/*!40000 ALTER TABLE `amenities` ENABLE KEYS */;

-- Dumping structure for table homeaway.bookings
CREATE TABLE IF NOT EXISTS `bookings` (
  `bookingId` int(11) NOT NULL AUTO_INCREMENT,
  `propertyId` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `guests` int(2) NOT NULL,
  `amount` float NOT NULL,
  `role` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`bookingId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Dumping data for table homeaway.bookings: ~2 rows (approximately)
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` (`bookingId`, `propertyId`, `username`, `startDate`, `endDate`, `guests`, `amount`, `role`) VALUES
	(1, 3, 'firstUser@gmail.com', '2018-10-11', '2018-10-12', 2, 906, NULL),
	(3, 3, 'firstUser@gmail.com', '2018-10-09', '2018-10-10', 2, 906, NULL),
	(4, 5, 'firstUser@gmail.com', '2018-10-18', '2018-10-20', 2, 1300, NULL);
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;

-- Dumping structure for table homeaway.properties
CREATE TABLE IF NOT EXISTS `properties` (
  `propertyId` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `street` varchar(255) NOT NULL,
  `unit` varchar(255) NOT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(255) NOT NULL,
  `zip` int(5) NOT NULL,
  `country` varchar(25) NOT NULL,
  `headline` varchar(1000) NOT NULL,
  `description` varchar(10000) NOT NULL,
  `type` varchar(20) NOT NULL,
  `bedrooms` int(2) NOT NULL,
  `bathroom` int(2) NOT NULL,
  `guests` int(2) NOT NULL,
  `bookingOption` varchar(50) NOT NULL,
  `singleNightRate` float NOT NULL,
  `minStay` int(3) NOT NULL,
  `propertyPictures` varchar(4000) NOT NULL,
  PRIMARY KEY (`propertyId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- Dumping data for table homeaway.properties: ~4 rows (approximately)
/*!40000 ALTER TABLE `properties` DISABLE KEYS */;
INSERT INTO `properties` (`propertyId`, `username`, `street`, `unit`, `city`, `state`, `zip`, `country`, `headline`, `description`, `type`, `bedrooms`, `bathroom`, `guests`, `bookingOption`, `singleNightRate`, `minStay`, `propertyPictures`) VALUES
	(1, 'nmodi@bjp.com', 'EH-01,Schme No.54,vijaynagar', 'asf', 'Indore', 'Madhya Pradesh', 95123, 'India', 'Yash', 'asd', 'Villa', 2, 2, 2, '24hour', 564, 1, '["http://localhost:8080/photos/c69dc4ee-85ac-418f-a282-ad03eff9bef5.png","http://localhost:8080/photos/bad7e6a8-dc32-47c5-bcfa-da9357a17d21.jpg"]'),
	(2, 'nmodi@bjp.com', '312,Savrna Residency,Niranjanpur', '23', 'Indore', 'Madhya Pradesh', 45201, 'India', 'Yash', 'shd', 'Villa', 3, 3, 9, '24hour', 453, 1, '["http://localhost:8080/photos/e1613aa4-b65e-4e87-85cf-7bc637a2c2ac.jpg","http://localhost:8080/photos/9a18c94e-e491-46fe-9b14-825c21e16cc4.png"]'),
	(3, 'nmodi@bjp.com', '312,Savrna Residency,Niranjanpur', '23', 'Indore', 'Madhya Pradesh', 45201, 'India', 'Brand New Modern 1BR - Pool+WiFi! - One Bedroom Apartment, Sleeps 4', 'shd', 'Villa', 3, 3, 4, '24hour', 453, 1, '["http://localhost:8080/photos/e1613aa4-b65e-4e87-85cf-7bc637a2c2ac.jpg","http://localhost:8080/photos/9a18c94e-e491-46fe-9b14-825c21e16cc4.png"]'),
	(4, 'nmodi@bjp.com', '312,Savrna Residency,Niranjanpur, 23', '23', 'Indore', 'Madhya Pradesh', 45201, 'India', 'ns ', 'sndn', 'Resort', 2, 2, 2, '24hour', 231, 1, '["http://localhost:8080/photos/1953db2b-dd4c-483f-bb59-b14f7c206a77.png","http://localhost:8080/photos/8d1009f6-9428-41cc-92f4-69fcf2239021.png"]'),
	(5, 'nmodi@bjp.com', '787 The Alameda', '323', 'San Jose', 'California', 95126, 'United States', '3BHK Scenic Apartment', 'It\'s Beautiful Apartment.', 'Apartment', 3, 3, 9, 'instant', 650, 2, '["http://localhost:8080/photos/0ef8f5ab-2db2-49d5-a6fa-2786fbf36ac6.jpg","http://localhost:8080/photos/dd58c7ec-26d0-451b-afcd-e8a4d9cb9ac2.jpg"]'),
	(6, 'nmodi@bjp.com', '787 The Alameda', '323', 'San Jose', 'California', 95126, 'United States', '3BHK Scenic Apartment', 'It\'s Beautiful Apartment.', 'Apartment', 3, 3, 9, 'instant', 650, 2, '["http://localhost:8080/photos/0ef8f5ab-2db2-49d5-a6fa-2786fbf36ac6.jpg","http://localhost:8080/photos/dd58c7ec-26d0-451b-afcd-e8a4d9cb9ac2.jpg"]'),
	(7, 'nmodi@bjp.com', '777, The Meridian Ave', '365', 'San Jose', 'California', 95126, 'United States', '2 Bedroom Beach side Villa', 'It\'s a peaceful property.', 'Villa', 2, 2, 4, 'instant', 850, 2, '["http://localhost:8080/photos/f11f19fb-e3c0-4f4e-b3af-a99211694c24.jpg","http://localhost:8080/photos/cb45f50f-2096-43ce-a999-393beab5d476.jpg","http://localhost:8080/photos/12ab0d71-4b4a-403a-81a9-a73ff076604b.jpg"]');
/*!40000 ALTER TABLE `properties` ENABLE KEYS */;

-- Dumping structure for table homeaway.propertyblockdates
CREATE TABLE IF NOT EXISTS `propertyblockdates` (
  `propertyId` int(11) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table homeaway.propertyblockdates: ~4 rows (approximately)
/*!40000 ALTER TABLE `propertyblockdates` DISABLE KEYS */;
INSERT INTO `propertyblockdates` (`propertyId`, `startDate`, `endDate`) VALUES
	(3, '2018-10-19', '2018-10-24'),
	(4, '2018-10-17', '2018-10-24'),
	(3, '2018-10-11', '2018-10-12'),
	(3, '2018-10-09', '2018-10-10'),
	(5, '2018-10-10', '2018-10-12'),
	(6, '2018-10-10', '2018-10-12'),
	(7, '2018-10-30', '2018-11-03'),
	(5, '2018-10-18', '2018-10-20');
/*!40000 ALTER TABLE `propertyblockdates` ENABLE KEYS */;

-- Dumping structure for table homeaway.propertypictures
CREATE TABLE IF NOT EXISTS `propertypictures` (
  `propertyId` int(11) NOT NULL,
  `pictureUrl` varchar(255) NOT NULL,
  `markForDelete` tinyint(1) NOT NULL,
  PRIMARY KEY (`propertyId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table homeaway.propertypictures: ~0 rows (approximately)
/*!40000 ALTER TABLE `propertypictures` DISABLE KEYS */;
/*!40000 ALTER TABLE `propertypictures` ENABLE KEYS */;

-- Dumping structure for table homeaway.users
CREATE TABLE IF NOT EXISTS `users` (
  `user_email` varchar(100) NOT NULL,
  `user_first_name` varchar(100) NOT NULL,
  `user_last_name` varchar(100) NOT NULL,
  `user_password` varchar(100) NOT NULL,
  `user_aboutme` varchar(4000) DEFAULT NULL,
  `user_gender` varchar(100) DEFAULT NULL,
  `user_phone_number` varchar(100) DEFAULT NULL,
  `user_languages` varchar(100) DEFAULT NULL,
  `user_city` varchar(100) DEFAULT NULL,
  `user_company` varchar(100) DEFAULT NULL,
  `user_school` varchar(100) DEFAULT NULL,
  `user_hometown` varchar(100) DEFAULT NULL,
  `user_role` varchar(100) NOT NULL,
  PRIMARY KEY (`user_email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table homeaway.users: ~8 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`user_email`, `user_first_name`, `user_last_name`, `user_password`, `user_aboutme`, `user_gender`, `user_phone_number`, `user_languages`, `user_city`, `user_company`, `user_school`, `user_hometown`, `user_role`) VALUES
	('firstUser@gmail.com', 'Yash', 'Mahajan', '$2a$10$Ih5Qpfy2JGL3iTIYpXM4vut2Ig2TVnh3Q0IKVKJVRYRoeE7kdyP/6', 'I\'m Cool !', 'Male', '669-234-5678', 'English, Spanish', 'San Jose', 'InfoBeans', 'SJSU', 'Indore', 'Traveller'),
	('mysjsu@edu.com', 'San Jose', 'University', '$2a$10$gbPVfEqzd0NQCOAqc6tSl.PeUoq2WLqp2IiNaxzlakB7sSXeVdn1G', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Traveller'),
	('nmodi@bjp.com', 'Narendra', 'Modi', '$2a$10$hWWUOLIgg4uqBSZryCdJHuzLlYqFxZHAJTijxgIdLdLnrLPpBeYK2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Owner');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

-- Dumping structure for table homeaway.user_profile_picture
CREATE TABLE IF NOT EXISTS `user_profile_picture` (
  `username` varchar(100) NOT NULL,
  `pic_url` varchar(200) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table homeaway.user_profile_picture: ~2 rows (approximately)
/*!40000 ALTER TABLE `user_profile_picture` DISABLE KEYS */;
INSERT INTO `user_profile_picture` (`username`, `pic_url`) VALUES
	('firstUser@gmail.com', 'http://localhost:8080/photos/0af15763-bc62-4c31-b2e7-46f18df222e0.png'),
	('ownerUser@gmail.com', 'http://localhost:8080/photos/39e9fa19-88fd-47d5-ac27-935bbe00b57e.jpg');
/*!40000 ALTER TABLE `user_profile_picture` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
