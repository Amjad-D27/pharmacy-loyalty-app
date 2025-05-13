-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: May 11, 2025 at 03:45 PM
-- Server version: 8.0.42
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `loyalty_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `Customer`
--
CREATE DATABASE loyalty_db;
USE loyalty_db; 

CREATE TABLE `Customer` (
  `customer_id` int NOT NULL,
  `pharmacy_id` int NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `date_of_birth` varchar(100) NOT NULL,
  `gender` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Customer`
--

INSERT INTO `Customer` (`customer_id`, `pharmacy_id`, `first_name`, `last_name`, `phone`, `date_of_birth`, `gender`, `created_at`) VALUES
(1, 8, 'customer 1', 'customer1', '03123456', '01-01-2000', 'male', '2025-04-30 08:53:14'),
(2, 8, 'customer 2', 'customer2', '03111222', '01-01-1999', 'male', '2025-04-30 09:05:17'),
(5, 10, 'customer3', 'customer3', '03222333', '01-01-1988', 'male', '2025-04-30 19:11:18'),
(6, 8, 'customer4', 'customer4', '03777777', '0987666', 'female', '2025-05-06 07:26:30'),
(7, 8, 'customer5', 'customer5', '03888888', '0977887', 'female', '2025-05-06 07:28:42'),
(8, 8, 'customer10', 'customer10', '03333333', '0998876', 'male', '2025-05-07 12:35:13'),
(10, 8, 'customer4', 'customer4', '03888999', '2000-10-10', 'female', '2025-05-10 09:30:46');

-- --------------------------------------------------------

--
-- Table structure for table `LoyaltyAccount`
--

CREATE TABLE `LoyaltyAccount` (
  `loyalty_account_id` int NOT NULL,
  `customer_id` int NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `total_points` int DEFAULT '0',
  `status` varchar(20) DEFAULT 'Active',
  `expiry_date` date DEFAULT NULL,
  `last_updated` date DEFAULT (curdate())
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `LoyaltyAccount`
--

INSERT INTO `LoyaltyAccount` (`loyalty_account_id`, `customer_id`, `first_name`, `last_name`, `phone`, `total_points`, `status`, `expiry_date`, `last_updated`) VALUES
(1, 1, 'customer 1', 'customer1', '03123456', 4820, 'Active', '2026-05-08', '2025-05-08'),
(2, 2, 'customer 2', 'customer2', '03111222', 2370, 'Active', '2026-05-08', '2025-05-08'),
(5, 5, 'customer3', 'customer3', '03222333', 2350, 'Active', '2026-05-08', '2025-05-08'),
(9, 10, 'customer4', 'customer4', '03888999', 200, 'Active', '2026-05-10', '2025-05-10');

-- --------------------------------------------------------

--
-- Table structure for table `Pharmacist`
--

CREATE TABLE `Pharmacist` (
  `pharmacist_id` int NOT NULL,
  `pharmacy_id` int NOT NULL,
  `password_hash` varchar(100) NOT NULL,
  `role` enum('admin','staff') DEFAULT 'staff',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Pharmacy`
--

CREATE TABLE `Pharmacy` (
  `pharmacy_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(100) NOT NULL,
  `status` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Pharmacy`
--

INSERT INTO `Pharmacy` (`pharmacy_id`, `name`, `email`, `password_hash`, `status`, `created_at`) VALUES
(8, 'Pharmacy ABC', 'pharmacy1@gmail.com', '$2b$10$czOOR8OEK7ByeOBCe1Fx2.fRgmlkjzphf11ue2VxmuUKy23fz94aq', 0, '2025-04-29 19:30:39'),
(9, 'Pharmacy EFG', 'pharmacy2@gmail.com', '$2b$10$nvH/kh8BIqbXYgLvbb6FYuZk9oa.4zYbXkjEIt3AVCMm091OnFpOS', 0, '2025-04-29 19:31:53'),
(10, 'Pharmacy XYZ', 'pharmacy3@gmail.com', '$2b$10$p8fOmiALJXqqM8fH/d/UweQqVPTe/67sPnkWYKHbIS7jna7DZfAGW', 0, '2025-04-30 12:39:43'),
(11, 'Pharmacy ABCD', 'pharmacy4@gmail.com', '$2b$10$XQ7SNjHF57y4BnqADBcKXeR2Yat2FkYB5LH9j3qvn.F/PS1otOxPe', 0, '2025-05-06 19:31:32');

-- --------------------------------------------------------

--
-- Table structure for table `PointsRule`
--

CREATE TABLE `PointsRule` (
  `id` int NOT NULL,
  `points_per_dollar` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `PointsRule`
--

INSERT INTO `PointsRule` (`id`, `points_per_dollar`) VALUES
(1, 10);

-- --------------------------------------------------------

--
-- Table structure for table `Redemption`
--

CREATE TABLE `Redemption` (
  `redemption_id` int NOT NULL,
  `customer_id` int NOT NULL,
  `pharmacy_id` int NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `points_used` int NOT NULL,
  `discount_applied` decimal(10,2) NOT NULL,
  `redemption_date` date DEFAULT (curdate())
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Redemption`
--

INSERT INTO `Redemption` (`redemption_id`, `customer_id`, `pharmacy_id`, `phone`, `amount`, `points_used`, `discount_applied`, `redemption_date`) VALUES
(1, 5, 10, '03222333', 75.00, 1000, 25.00, '2025-05-03'),
(4, 5, 10, '03222333', 56.25, 1000, 18.75, '2025-05-03'),
(5, 1, 8, '03123456', 37.50, 1000, 12.50, '2025-05-07'),
(6, 10, 8, '03888999', 75.00, 1000, 25.00, '2025-05-10');

-- --------------------------------------------------------

--
-- Table structure for table `Transaction`
--

CREATE TABLE `Transaction` (
  `transaction_id` int NOT NULL,
  `customer_id` int NOT NULL,
  `pharmacy_id` int NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `points_earned` int NOT NULL,
  `transaction_date` date DEFAULT (curdate())
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Transaction`
--

INSERT INTO `Transaction` (`transaction_id`, `customer_id`, `pharmacy_id`, `phone`, `amount`, `points_earned`, `transaction_date`) VALUES
(1, 1, 8, '03123456', 47.00, 470, '2025-05-02'),
(2, 2, 8, '03111222', 72.00, 720, '2025-05-02'),
(4, 5, 10, '03222333', 220.00, 2200, '2025-05-03'),
(8, 1, 8, '03123456', 100.00, 1000, '2025-05-03'),
(9, 5, 10, '03222333', 100.00, 1500, '2025-05-06'),
(10, 1, 8, '03123456', 50.00, 1000, '2025-05-06'),
(11, 2, 8, '03111222', 70.00, 700, '2025-05-06'),
(12, 1, 8, '03123456', 40.00, 400, '2025-05-06'),
(13, 1, 8, '03123456', 100.00, 1000, '2025-05-07'),
(14, 1, 8, '03123456', 100.00, 1500, '2025-05-07'),
(15, 1, 8, '03123456', 10.00, 150, '2025-05-08'),
(18, 1, 8, '03123456', 10.00, 150, '2025-05-08'),
(19, 2, 8, '03111222', 20.00, 300, '2025-05-08'),
(20, 1, 8, '03123456', 10.00, 150, '2025-05-08'),
(21, 2, 8, '03111222', 65.00, 650, '2025-05-08'),
(22, 5, 10, '03222333', 55.00, 550, '2025-05-08'),
(23, 5, 10, '03222333', 10.00, 100, '2025-05-08'),
(24, 10, 8, '03888999', 20.00, 200, '2025-05-10'),
(25, 10, 8, '03888999', 100.00, 1000, '2025-05-10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Customer`
--
ALTER TABLE `Customer`
  ADD PRIMARY KEY (`customer_id`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD KEY `pharmacy_id` (`pharmacy_id`);

--
-- Indexes for table `LoyaltyAccount`
--
ALTER TABLE `LoyaltyAccount`
  ADD PRIMARY KEY (`loyalty_account_id`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `Pharmacist`
--
ALTER TABLE `Pharmacist`
  ADD PRIMARY KEY (`pharmacist_id`),
  ADD KEY `pharmacy_id` (`pharmacy_id`);

--
-- Indexes for table `Pharmacy`
--
ALTER TABLE `Pharmacy`
  ADD PRIMARY KEY (`pharmacy_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `PointsRule`
--
ALTER TABLE `PointsRule`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Redemption`
--
ALTER TABLE `Redemption`
  ADD PRIMARY KEY (`redemption_id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `pharmacy_id` (`pharmacy_id`);

--
-- Indexes for table `Transaction`
--
ALTER TABLE `Transaction`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `pharmacy_id` (`pharmacy_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Customer`
--
ALTER TABLE `Customer`
  MODIFY `customer_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `LoyaltyAccount`
--
ALTER TABLE `LoyaltyAccount`
  MODIFY `loyalty_account_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `Pharmacist`
--
ALTER TABLE `Pharmacist`
  MODIFY `pharmacist_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Pharmacy`
--
ALTER TABLE `Pharmacy`
  MODIFY `pharmacy_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `PointsRule`
--
ALTER TABLE `PointsRule`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Redemption`
--
ALTER TABLE `Redemption`
  MODIFY `redemption_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Transaction`
--
ALTER TABLE `Transaction`
  MODIFY `transaction_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Customer`
--
ALTER TABLE `Customer`
  ADD CONSTRAINT `Customer_ibfk_1` FOREIGN KEY (`pharmacy_id`) REFERENCES `Pharmacy` (`pharmacy_id`) ON DELETE CASCADE;

--
-- Constraints for table `LoyaltyAccount`
--
ALTER TABLE `LoyaltyAccount`
  ADD CONSTRAINT `LoyaltyAccount_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `Customer` (`customer_id`) ON DELETE CASCADE;

--
-- Constraints for table `Pharmacist`
--
ALTER TABLE `Pharmacist`
  ADD CONSTRAINT `Pharmacist_ibfk_1` FOREIGN KEY (`pharmacy_id`) REFERENCES `Pharmacy` (`pharmacy_id`) ON DELETE CASCADE;

--
-- Constraints for table `Redemption`
--
ALTER TABLE `Redemption`
  ADD CONSTRAINT `Redemption_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `Customer` (`customer_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `Redemption_ibfk_2` FOREIGN KEY (`pharmacy_id`) REFERENCES `Pharmacy` (`pharmacy_id`) ON DELETE CASCADE;

--
-- Constraints for table `Transaction`
--
ALTER TABLE `Transaction`
  ADD CONSTRAINT `Transaction_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `Customer` (`customer_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `Transaction_ibfk_2` FOREIGN KEY (`pharmacy_id`) REFERENCES `Pharmacy` (`pharmacy_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
