import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'Vitalii', description: "Ім'я учасника" })
    readonly firstName: string;

    @ApiProperty({ example: 'Pidhornyi', description: 'Прізвище учасника' })
    readonly lastName: string;

    @ApiProperty({
        example: ['Computer', 'Phone', 'Book'],
        description: 'Список бажань учасника',
    })
    readonly wishList: [];
}
