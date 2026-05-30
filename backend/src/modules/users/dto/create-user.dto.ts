import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, IsIn, IsBoolean } from 'class-validator';

export class CreateUserDto {
    @IsEmail({}, { message: 'Email không đúng định dạng' })
    @IsNotEmpty({ message: 'Email không được để trống' })
    email: string;

    @IsString({ message: 'Mật khẩu phải là một chuỗi ký tự' })
    @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
    @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
    password: string;

    @IsString({ message: 'Họ và tên phải là một chuỗi ký tự' })
    @IsOptional()
    fullName?: string;

    @IsString({ message: 'Số điện thoại phải là một chuỗi ký tự' })
    @IsOptional()
    phone?: string;

    @IsString({ message: 'Địa chỉ phải là một chuỗi ký tự' })
    @IsOptional()
    address?: string;

    @IsString({ message: 'Quyền hạn phải là một chuỗi ký tự' })
    @IsOptional()
    @IsIn(['user', 'admin', 'staff'], { message: 'Quyền hạn không hợp lệ' })
    role?: string;

    @IsBoolean({ message: 'Trạng thái hoạt động phải là kiểu boolean' })
    @IsOptional()
    isActive?: boolean;
}
