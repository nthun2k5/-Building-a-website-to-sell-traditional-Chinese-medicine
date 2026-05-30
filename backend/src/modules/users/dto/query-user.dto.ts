import { IsOptional, IsString, IsInt, Min, Max, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryUserDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt({ message: 'Trang phải là số nguyên' })
    @Min(1, { message: 'Trang tối thiểu là 1' })
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt({ message: 'Số lượng phần tử phải là số nguyên' })
    @Min(1, { message: 'Số lượng phần tử tối thiểu là 1' })
    @Max(100, { message: 'Số lượng phần tử tối đa là 100' })
    limit?: number = 10;

    @IsOptional()
    @IsString({ message: 'Từ khóa tìm kiếm phải là chuỗi ký tự' })
    search?: string;

    @IsOptional()
    @IsString({ message: 'Quyền hạn phải là chuỗi ký tự' })
    @IsIn(['user', 'admin', 'staff'], { message: 'Quyền hạn không hợp lệ' })
    role?: string;

    @IsOptional()
    @IsString({ message: 'Trạng thái hoạt động phải là chuỗi ký tự' })
    @IsIn(['true', 'false', '1', '0'], { message: 'Trạng thái hoạt động không hợp lệ' })
    isActive?: string;

    @IsOptional()
    @IsString({ message: 'Trường sắp xếp phải là chuỗi ký tự' })
    @IsIn(['id', 'email', 'fullName', 'createdAt', 'role'], { message: 'Cột sắp xếp không hợp lệ' })
    sortBy?: string = 'createdAt';

    @IsOptional()
    @IsString({ message: 'Hướng sắp xếp phải là chuỗi ký tự' })
    @IsIn(['ASC', 'DESC', 'asc', 'desc'], { message: 'Hướng sắp xếp phải là ASC hoặc DESC' })
    sortOrder?: string = 'DESC';
}
