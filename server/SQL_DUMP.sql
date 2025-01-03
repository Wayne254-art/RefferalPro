-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.37 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.7.0.6850
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for referral

-- Dumping structure for table referral.activity
CREATE TABLE IF NOT EXISTS `activity` (
  `activityId` varchar(200) NOT NULL,
  `userId` varchar(200) NOT NULL,
  `referralId` varchar(200) DEFAULT NULL,
  `activityType` enum('signup','deposit','other','withdrawal') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `activityStatus` enum('pending','completed') DEFAULT 'pending',
  `activityAmount` decimal(10,2) DEFAULT NULL,
  `activityData` json DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`activityId`),
  KEY `userId` (`userId`),
  KEY `referralId` (`referralId`),
  CONSTRAINT `activity_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  CONSTRAINT `activity_ibfk_2` FOREIGN KEY (`referralId`) REFERENCES `referrals` (`referralId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table referral.qrcodeimage
CREATE TABLE IF NOT EXISTS `qrcodeimage` (
  `qrCodeId` varchar(200) NOT NULL,
  `userId` varchar(200) NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `imagePath` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`qrCodeId`),
  KEY `qrcodeimage_ibfk_1` (`userId`),
  CONSTRAINT `qrcodeimage_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table referral.referrals
CREATE TABLE IF NOT EXISTS `referrals` (
  `referralId` varchar(200) NOT NULL,
  `referrerId` varchar(200) DEFAULT NULL,
  `referredId` varchar(200) DEFAULT NULL,
  `referralCode` varchar(50) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`referralId`),
  KEY `referralCode` (`referralCode`),
  KEY `referrals_ibfk_2` (`referredId`),
  KEY `referrals_ibfk_1` (`referrerId`),
  CONSTRAINT `referrals_ibfk_1` FOREIGN KEY (`referrerId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `referrals_ibfk_2` FOREIGN KEY (`referredId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `referrals_ibfk_3` FOREIGN KEY (`referralCode`) REFERENCES `users` (`referralCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table referral.rewards
CREATE TABLE IF NOT EXISTS `rewards` (
  `rewardId` varchar(200) NOT NULL,
  `userId` varchar(200) NOT NULL,
  `rewardType` varchar(50) NOT NULL,
  `rewardAmount` decimal(10,2) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`rewardId`),
  KEY `userId` (`userId`),
  CONSTRAINT `rewards_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table referral.users
CREATE TABLE IF NOT EXISTS `users` (
  `userId` varchar(200) NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phoneNumber` varchar(50) NOT NULL,
  `role` enum('user','Admin') DEFAULT 'user',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `referralCode` varchar(50) NOT NULL,
  `password` varchar(1000) NOT NULL,
  `avatar` varchar(5000) NOT NULL DEFAULT 'https://cdn.icon-icons.com/icons2/317/PNG/512/user-female-icon_34335.png',
  `status` tinyint(1) DEFAULT '0',
  `isActive` tinyint(1) DEFAULT '1',
  `isVerified` enum('false','true') DEFAULT 'false',
  `lastVerified` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `totalBalance` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`userId`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `referralCode` (`referralCode`),
  UNIQUE KEY `phoneNumber` (`phoneNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
