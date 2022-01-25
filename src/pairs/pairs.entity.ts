import {
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    Column,
} from 'typeorm';
import { User } from '../users/users.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Pair {
    @ApiProperty({ example: '1', description: 'Унікальний ID пари' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: '2',
        description: 'ID відправника подарунка - "санти"',
    })
    @Column({ name: 'sender_id' })
    senderId: number;

    @ApiProperty({ example: '3', description: 'ID одержувача подарунка' })
    @Column({ name: 'recipient_id' })
    recipientId: number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'sender_id' })
    user: User;

    @OneToOne(() => User)
    @JoinColumn({ name: 'recipient_id' })
    user2: User;
}
