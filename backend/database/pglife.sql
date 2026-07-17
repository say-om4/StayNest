CREATE DATABASE IF NOT EXISTS pglife;
USE pglife;

-- ===========================
-- USERS TABLE
-- ===========================

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user','admin') NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admin user will be created during registration

-- ===========================
-- PGS TABLE
-- ===========================

CREATE TABLE pgs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL DEFAULT NULL,
    name VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    rating DECIMAL(2,1) DEFAULT 0,
    room_type VARCHAR(50),
    gender ENUM('Boys','Girls','Unisex'),
    food BOOLEAN DEFAULT TRUE,
    wifi BOOLEAN DEFAULT TRUE,
    bathroom VARCHAR(50),
    parking BOOLEAN DEFAULT FALSE,
    power_backup BOOLEAN DEFAULT TRUE,
    independent BOOLEAN DEFAULT FALSE,
    image VARCHAR(255),
    description TEXT,
    status ENUM('Vacant', 'Full') NOT NULL DEFAULT 'Vacant',
    property_type ENUM('PG', 'Room', 'Apartment', 'Hostel') NOT NULL DEFAULT 'PG',
    rating_setting ENUM('reviews', 'admin') NOT NULL DEFAULT 'reviews',
    contact_display ENUM('both', 'email', 'phone') NOT NULL DEFAULT 'both',
    phone2 VARCHAR(15) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ===========================
-- WISHLIST TABLE
-- ===========================

CREATE TABLE wishlist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    pg_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (pg_id) REFERENCES pgs(id) ON DELETE CASCADE
);

-- ===========================
-- BOOKINGS TABLE
-- ===========================

CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    pg_id INT NOT NULL,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Pending','Confirmed','Cancelled') DEFAULT 'Pending',

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (pg_id) REFERENCES pgs(id) ON DELETE CASCADE
);