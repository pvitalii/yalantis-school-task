import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PairsModule } from './pairs/pairs.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        ConfigModule.forRoot(),
        UsersModule,
        PairsModule,
    ],
})
export class AppModule {}
