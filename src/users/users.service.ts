import {
    forwardRef,
    HttpException,
    HttpStatus,
    Inject,
    Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { PairsService } from '../pairs/pairs.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @Inject(forwardRef(() => PairsService))
        private pairsService: PairsService
    ) {}

    async createUser(dto: CreateUserDto) {
        if (dto.wishList.length < 1 || dto.wishList.length > 10)
            throw new HttpException(
                'The list must contain from 1 to 10 wishes',
                HttpStatus.BAD_REQUEST
            );
        const list = dto.wishList.toString();
        const user = await this.usersRepository.create({
            firstName: dto.firstName,
            lastName: dto.lastName,
            wishList: list,
        });
        return this.usersRepository.save(user);
    }

    async getAll() {
        return this.usersRepository.find();
    }

    async getIDs() {
        return this.usersRepository.find({ select: ['id'] });
    }

    async getRecipient(sender: number) {
        const { recipientId } = await this.pairsService.getRecipientBySenderId(
            sender
        );
        return this.usersRepository.findOne({ where: { id: recipientId } });
    }
}
