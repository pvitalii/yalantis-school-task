import { forwardRef, Module } from '@nestjs/common';
import { PairsService } from './pairs.service';
import { PairsController } from './pairs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pair } from './pairs.entity';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([Pair]), forwardRef(() => UsersModule)],
    providers: [PairsService],
    controllers: [PairsController],
    exports: [PairsService],
})
export class PairsModule {}
