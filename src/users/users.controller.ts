import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.entity';

@ApiTags('Учасники гри')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiOperation({ summary: 'Реєстрація учасників' })
    @ApiResponse({ status: 201, type: User })
    @Post('add')
    async createUser(@Body() dto: CreateUserDto) {
        return this.usersService.createUser(dto);
    }

    @ApiOperation({
        summary:
            "Отримання інформації (ім'я, прізвище, список бажань) про одержувача за ID відправника",
    })
    @ApiResponse({ status: 200, type: User })
    @Get('recipient')
    async getRecipient(@Query('senderId') sender: number) {
        return this.usersService.getRecipient(sender);
    }

    @ApiOperation({
        summary:
            "Переглянути інформацію (ім'я, прізвище, список бажань) про всіх зареєстрованих учасників",
    })
    @ApiResponse({ status: 200, type: [User] })
    @Get('fetch')
    async getAll() {
        return this.usersService.getAll();
    }
}
