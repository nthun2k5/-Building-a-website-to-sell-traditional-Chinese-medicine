import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // API tạo mới người dùng
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    // API lấy danh sách người dùng hỗ trợ phân trang, lọc và tìm kiếm nâng cao
    @Get()
    findAll(@Query() query: QueryUserDto) {
        return this.usersService.findAll(query);
    }

    // API lấy thông tin chi tiết một người dùng
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id);
    }

    // API cập nhật thông tin người dùng
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto
    ) {
        return this.usersService.update(id, updateUserDto);
    }

    // API xóa người dùng (Mặc định là Soft Delete - vô hiệu hóa hoạt động, truyền tham số ?softDelete=false để xóa cứng)
    @Delete(':id')
    remove(
        @Param('id', ParseIntPipe) id: number,
        @Query('softDelete') softDelete?: string
    ) {
        const isSoft = softDelete === undefined ? true : (softDelete === 'true' || softDelete === '1');
        return this.usersService.remove(id, isSoft);
    }
}
