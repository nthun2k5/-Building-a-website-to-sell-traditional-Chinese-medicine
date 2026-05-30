CREATE SCHEMA auth;
CREATE SCHEMA account;
CREATE SCHEMA 

CREATE TABLE auth.roles(
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
)
    
CREATE TABLE auth.users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    isActive BIT DEFAULT 1,
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE account.customers (
    id INT IDENTITY(1,1) PRIMARY KEY,
    userId INT NOT NULL,
    phone VARCHAR(20) NULL,
    address NVARCHAR(500) NULL,
    
);


CREATE INDEX IX_users_email ON auth.users(email);
