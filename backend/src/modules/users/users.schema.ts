export const usersSchemaSql = `
-- 1. Tạo Database Schema riêng cho nghiệp vụ users nếu chưa tồn tại
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'usr')
BEGIN
    EXEC('CREATE SCHEMA usr');
END;

-- 2. Tạo bảng users thuộc schema usr nếu chưa tồn tại
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='users' AND schema_id = SCHEMA_ID('usr') AND xtype='U')
BEGIN
    CREATE TABLE usr.users (
        id INT IDENTITY(1,1) PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        fullName NVARCHAR(255) NULL,
        phone VARCHAR(20) NULL,
        address NVARCHAR(500) NULL,
        role VARCHAR(50) DEFAULT 'user',
        isActive BIT DEFAULT 1,
        createdAt DATETIME DEFAULT GETDATE(),
        updatedAt DATETIME DEFAULT GETDATE()
    );
END;

-- 3. Tạo Index cho email để tối ưu hóa tìm kiếm nếu chưa tồn tại
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_users_email' AND object_id = OBJECT_ID('usr.users'))
BEGIN
    CREATE INDEX IX_users_email ON usr.users(email);
END;
`;
