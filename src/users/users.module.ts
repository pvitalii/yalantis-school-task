import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PairsModule } from '../pairs/pairs.module';

@Module({
    imports: [TypeOrmModule.forFeature([User]), forwardRef(() => PairsModule)],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
