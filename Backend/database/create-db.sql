-- Drop the database if it already exists
DROP DATABASE IF EXISTS HEALTHYSUPP;

-- Create a new database
CREATE DATABASE HEALTHYSUPP;
USE HEALTHYSUPP;

-- Table for storing products
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(5, 2) DEFAULT 0.00, -- Default discount to 0.00 if not specified
    description TEXT,
    image_urls TEXT -- Store multiple image URLs, either as JSON string or comma-separated
);

-- Table for storing users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL, -- Ensure email uniqueness
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20) -- Store phone numbers as text to accommodate various formats
);

-- Table for storing feedback entries
CREATE TABLE feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL, -- Email is required but not unique
    message TEXT NOT NULL -- Feedback message content
);

-- Optional: Verify that the tables are created successfully
SHOW TABLES;
