import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepo: UsersRepository) {}

    // Tạo mới người dùng
    async create(createUserDto: CreateUserDto) {
        // Kiểm tra xem email đã được đăng ký hay chưa
        const existing = await this.usersRepo.findByEmail(createUserDto.email);
        if (existing) {
            throw new ConflictException('Email đã được sử dụng bởi một tài khoản khác');
        }

        // Mã hóa mật khẩu an toàn bằng bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

        // Lưu tài khoản và lấy bản ghi đã chèn
        const record = await this.usersRepo.create({
            ...createUserDto,
            passwordHash: hashedPassword,
        });

        return User.sanitize(record);
    }

    // Lấy danh sách người dùng với phân trang, lọc và sắp xếp
    async findAll(query: QueryUserDto) {
        const { records, total } = await this.usersRepo.findAndCount(query);
        const sanitizedData = records.map(record => User.sanitize(record));

        return {
            data: sanitizedData,
            meta: {
                total,
                page: query.page || 1,
                limit: query.limit || 10,
                totalPages: Math.ceil(total / (query.limit || 10)),
            },
        };
    }

    // Tìm một người dùng theo ID
    async findOne(id: number): Promise<Omit<User, 'password'>> {
        const record = await this.usersRepo.findById(id);
        if (!record) {
            throw new NotFoundException(`Không tìm thấy người dùng với ID #${id}`);
        }
        return User.sanitize(record)!;
    }

    // Tìm một người dùng theo email (chỉ dùng nội bộ phục vụ cho Auth)
    async findByEmail(email: string) {
        return this.usersRepo.findByEmail(email);
    }

    // Cập nhật thông tin người dùng
    async update(id: number, updateUserDto: UpdateUserDto) {
        // Kiểm tra xem người dùng có tồn tại không
        const user = await this.findOne(id);

        const updates: string[] = [];
        const params: Record<string, any> = {};

        // Kiểm tra trùng lặp email nếu cập nhật email mới
        if (updateUserDto.email && updateUserDto.email !== user.email) {
            const existing = await this.usersRepo.findByEmail(updateUserDto.email);
            if (existing && existing.id !== id) {
                throw new ConflictException('Email đã được sử dụng bởi một tài khoản khác');
            }
            updates.push('email = @email');
            params.email = updateUserDto.email;
        }

        // Mã hóa lại mật khẩu nếu người dùng thay đổi mật khẩu
        if (updateUserDto.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(updateUserDto.password, salt);
            updates.push('password = @password');
            params.password = hashedPassword;
        }

        if (updateUserDto.fullName !== undefined) {
            updates.push('fullName = @fullName');
            params.fullName = updateUserDto.fullName;
        }

        if (updateUserDto.phone !== undefined) {
            updates.push('phone = @phone');
            params.phone = updateUserDto.phone;
        }

        if (updateUserDto.address !== undefined) {
            updates.push('address = @address');
            params.address = updateUserDto.address;
        }

        if (updateUserDto.role) {
            updates.push('role = @role');
            params.role = updateUserDto.role;
        }

        if (updateUserDto.isActive !== undefined) {
            updates.push('isActive = @isActive');
            params.isActive = updateUserDto.isActive === true ? 1 : 0;
        }

        if (updates.length === 0) {
            return user;
        }

        updates.push('updatedAt = GETDATE()');

        const record = await this.usersRepo.update(id, updates, params);
        return User.sanitize(record);
    }

    // Xóa người dùng (Mặc định sử dụng Soft Delete để bảo vệ dữ liệu toàn vẹn)
    async remove(id: number, softDelete = true) {
        // Đảm bảo người dùng tồn tại
        await this.findOne(id);

        if (softDelete) {
            await this.usersRepo.softDelete(id);
            return {
                message: `Đã vô hiệu hóa thành công tài khoản người dùng có ID #${id}`,
                success: true,
            };
        } else {
            await this.usersRepo.hardDelete(id);
            return {
                message: `Đã xóa vĩnh viễn thành công người dùng có ID #${id}`,
                success: true,
            };
        }
    }
}
