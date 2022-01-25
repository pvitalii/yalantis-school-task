import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
    @ApiProperty({ example: '1', description: 'Унікальний ID учасника гри' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'Vitalii', description: "Ім'я учасника" })
    @Column()
    firstName: string;

    @ApiProperty({ example: 'Pidhornyi', description: 'Прізвище учасника' })
    @Column()
    lastName: string;

    @ApiProperty({
        example: 'Computer, Phone, Book',
        description: 'Список бажань учасника',
    })
    @Column()
    wishList: string;
}
