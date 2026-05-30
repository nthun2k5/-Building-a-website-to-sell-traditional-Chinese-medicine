import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserDto } from './dto/query-user.dto';

@Injectable()
export class UsersRepository {
    constructor(private readonly db: DatabaseService) {}

    // Tìm kiếm người dùng bằng email
    async findByEmail(email: string) {
        const records = await this.db.query(
            'SELECT id, email, password, fullName, phone, address, role, isActive, createdAt, updatedAt FROM usr.users WHERE email = @email',
            { email }
        );
        return records[0] || null;
    }

    // Tìm kiếm người dùng bằng ID
    async findById(id: number) {
        const records = await this.db.query(
            'SELECT id, email, fullName, phone, address, role, isActive, createdAt, updatedAt FROM usr.users WHERE id = @id',
            { id }
        );
        return records[0] || null;
    }

    // Tạo mới tài khoản vào cơ sở dữ liệu
    async create(data: CreateUserDto & { passwordHash: string }) {
        const query = `
            INSERT INTO usr.users (email, password, fullName, phone, address, role)
            OUTPUT INSERTED.id, INSERTED.email, INSERTED.fullName, INSERTED.phone, INSERTED.address, INSERTED.role, INSERTED.isActive, INSERTED.createdAt, INSERTED.updatedAt
            VALUES (@email, @password, @fullName, @phone, @address, @role)
        `;

        const records = await this.db.query(query, {
            email: data.email,
            password: data.passwordHash,
            fullName: data.fullName ?? null,
            phone: data.phone ?? null,
            address: data.address ?? null,
            role: data.role ?? 'user',
        });

        return records[0];
    }

    // Tìm kiếm danh sách kết hợp đếm tổng số bản ghi phục vụ phân trang
    async findAndCount(query: QueryUserDto) {
        const page = query.page || 1;
        const limit = query.limit || 10;
        const offset = (page - 1) * limit;
        const sortBy = query.sortBy || 'createdAt';
        const sortOrder = query.sortOrder ? query.sortOrder.toUpperCase() : 'DESC';

        const params: Record<string, any> = {};
        const whereClauses: string[] = [];

        if (query.search) {
            whereClauses.push('(email LIKE @search OR fullName LIKE @search)');
            params.search = `%${query.search}%`;
        }

        if (query.role) {
            whereClauses.push('role = @role');
            params.role = query.role;
        }

        if (query.isActive !== undefined) {
            const isActiveVal = (query.isActive === 'true' || query.isActive === '1') ? 1 : 0;
            whereClauses.push('isActive = @isActive');
            params.isActive = isActiveVal;
        }

        const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

        // 1. Đếm tổng
        const countQuery = `SELECT COUNT(*) as total FROM usr.users ${whereSql}`;
        const countResult = await this.db.query(countQuery, params);
        const total = countResult[0]?.total || 0;

        // 2. Lấy dữ liệu phân trang
        const allowedSortColumns = ['id', 'email', 'fullName', 'createdAt', 'role'];
        const cleanSortBy = allowedSortColumns.includes(sortBy) ? sortBy : 'createdAt';
        const cleanSortOrder = ['ASC', 'DESC'].includes(sortOrder) ? sortOrder : 'DESC';

        const dataQuery = `
            SELECT id, email, fullName, phone, address, role, isActive, createdAt, updatedAt
            FROM usr.users
            ${whereSql}
            ORDER BY ${cleanSortBy} ${cleanSortOrder}
            OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY;
        `;

        const records = await this.db.query(dataQuery, {
            ...params,
            offset,
            limit,
        });

        return { records, total };
    }

    // Cập nhật động bản ghi theo mảng trường thay đổi
    async update(id: number, updates: string[], params: Record<string, any>) {
        const query = `
            UPDATE usr.users
            SET ${updates.join(', ')}
            OUTPUT INSERTED.id, INSERTED.email, INSERTED.fullName, INSERTED.phone, INSERTED.address, INSERTED.role, INSERTED.isActive, INSERTED.createdAt, INSERTED.updatedAt
            WHERE id = @id
        `;

        const records = await this.db.query(query, { ...params, id });
        return records[0];
    }

    // Vô hiệu hóa tài khoản (Soft Delete)
    async softDelete(id: number): Promise<void> {
        await this.db.query(
            'UPDATE usr.users SET isActive = 0, updatedAt = GETDATE() WHERE id = @id',
            { id }
        );
    }

    // Xóa cứng bản ghi (Hard Delete)
    async hardDelete(id: number): Promise<void> {
        await this.db.query('DELETE FROM usr.users WHERE id = @id', { id });
    }
}
