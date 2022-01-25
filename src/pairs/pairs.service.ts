import {
    forwardRef,
    HttpException,
    HttpStatus,
    Inject,
    Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Pair } from './pairs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePairDto } from './dto/create-pair.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class PairsService {
    constructor(
        @InjectRepository(Pair)
        private pairsRepository: Repository<Pair>,
        @Inject(forwardRef(() => UsersService))
        private usersService: UsersService
    ) {}

    private async createPair(dto: CreatePairDto) {
        return this.pairsRepository.save(
            this.pairsRepository.create({
                senderId: dto.sender_id,
                recipientId: dto.recipient_id,
            })
        );
    }

    async getAll() {
        return this.pairsRepository.find();
    }

    async shuffle() {
        const pairs = await this.getAll();
        if (pairs.length > 0)
            throw new HttpException(
                'Pairs already formed. You should delete current pairs to shuffle again',
                HttpStatus.BAD_REQUEST
            );
        const users = await this.usersService.getIDs();
        const senders = [];
        users.map((object) => {
            senders.push(object.id);
        });
        if (senders.length < 3 || senders.length > 500)
            throw new HttpException(
                'The number of participants must be from 3 to 500',
                HttpStatus.BAD_REQUEST
            );
        function calculate(idList) {
            const recipients = [];
            for (let i = 0; i < idList.length; i++) {
                let randomIndex = -1;
                let attempts = 0;
                while (
                    randomIndex == -1 ||
                    randomIndex == i ||
                    recipients.indexOf(idList[randomIndex]) != -1
                ) {
                    randomIndex = Math.floor(Math.random() * idList.length);
                    attempts++;
                }
                recipients.push(idList[randomIndex]);
            }
            return recipients;
        }
        const result = calculate(senders);
        for (let i = 0; i < senders.length; i++) {
            await this.createPair({
                sender_id: senders[i],
                recipient_id: result[i],
            });
        }
        return { message: 'Pairs successfully created' };
    }

    async getRecipientBySenderId(sender: number) {
        return this.pairsRepository.findOne({ where: { senderId: sender } });
    }
}
