-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 19, 2020 at 08:51 AM
-- Server version: 5.7.24
-- PHP Version: 7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `moviedb`
--

DELIMITER $$
--
-- Functions
--
CREATE DEFINER=`root`@`localhost` FUNCTION `capitalize` (`s` VARCHAR(255)) RETURNS VARCHAR(255) CHARSET utf8 BEGIN
  declare c int;
  declare x varchar(255);
  declare y varchar(255);
  declare z varchar(255);

  set x = UPPER( SUBSTRING( s, 1, 1));
  set y = SUBSTR( s, 2);
  set c = instr( y, ' ');

  while c > 0
    do
      set z = SUBSTR( y, 1, c);
      set x = CONCAT( x, z);
      set z = UPPER( SUBSTR( y, c+1, 1));
      set x = CONCAT( x, z);
      set y = SUBSTR( y, c+2);
      set c = INSTR( y, ' ');     
  end while;
  set x = CONCAT(x, y);
  return x;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `actors`
--

CREATE TABLE `actors` (
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `actors`
--

INSERT INTO `actors` (`firstName`, `lastName`, `id`) VALUES
('Brad', 'Pitt', 1),
('Kate', 'Winslet', 2),
('Leonardo', 'DiCaprio', 3),
('Jennifer', 'Aniston', 4),
('Tom', 'Hanks', 5),
('Billy', 'Zane', 6),
('Julia', 'Roberts', 7),
('Samuel', 'L Jackson', 8),
('Bruce', 'Willis', 9),
('Alan', 'Rickman', 10),
('Matt', 'Damon', 11),
('Joseph', 'Gordon-Lewitt', 12),
('Albert', 'Finney', 13),
('Robin', 'Wright', 14),
('Ben', 'Stiller', 15),
('Jim', 'Carrey', 16),
('Laura ', 'Linney', 17),
('John', 'Travolta', 18),
('Test', 'Testsson', 19),
('test', 'testsson', 20),
('Test', 'Testsson', 21),
('Kalle', 'Anka', 23);

--
-- Triggers `actors`
--
DELIMITER $$
CREATE TRIGGER `frst_l_up_insert` BEFORE INSERT ON `actors` FOR EACH ROW SET NEW.firstName = capitalize(NEW.firstName), NEW.lastName = capitalize(NEW.lastName)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `actors_titles`
--

CREATE TABLE `actors_titles` (
  `id` int(11) NOT NULL,
  `actor_id` int(11) NOT NULL,
  `title_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `actors_titles`
--

INSERT INTO `actors_titles` (`id`, `actor_id`, `title_id`) VALUES
(5, 4, 7),
(6, 15, 7),
(7, 9, 2),
(8, 10, 2),
(9, 7, 5),
(10, 13, 5),
(11, 16, 9),
(12, 2, 9),
(13, 5, 6),
(14, 14, 6),
(15, 3, 4),
(16, 12, 4),
(17, 9, 1),
(18, 8, 1),
(19, 5, 3),
(20, 11, 3),
(21, 3, 8),
(22, 2, 8),
(23, 16, 10),
(24, 17, 10),
(25, 18, 1);

-- --------------------------------------------------------

--
-- Table structure for table `titles`
--

CREATE TABLE `titles` (
  `title` varchar(50) NOT NULL,
  `year` int(11) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `titles`
--

INSERT INTO `titles` (`title`, `year`, `id`) VALUES
('Pulp Fiction', 1994, 1),
('Die Hard', 1988, 2),
('Saving Private Ryan', 1998, 3),
('Inception', 2010, 4),
('Erin Brockovich', 2000, 5),
('Forrest Gump', 1994, 6),
('Along came Polly', 2004, 7),
('Titanic', 1997, 8),
('Eternal Sunshine of the Spotless mind', 2000, 9),
('Truman Show', 1998, 10);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `actors`
--
ALTER TABLE `actors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `actors_titles`
--
ALTER TABLE `actors_titles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `actorskey` (`actor_id`),
  ADD KEY `titleskey` (`title_id`);

--
-- Indexes for table `titles`
--
ALTER TABLE `titles`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `actors`
--
ALTER TABLE `actors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `actors_titles`
--
ALTER TABLE `actors_titles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `titles`
--
ALTER TABLE `titles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `actors_titles`
--
ALTER TABLE `actors_titles`
  ADD CONSTRAINT `actorskey` FOREIGN KEY (`actor_id`) REFERENCES `actors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `titleskey` FOREIGN KEY (`title_id`) REFERENCES `titles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
