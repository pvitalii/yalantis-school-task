import { Controller, Get, Post } from '@nestjs/common';
import { PairsService } from './pairs.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Pair } from './pairs.entity';

@ApiTags('Пари')
@Controller('pairs')
export class PairsController {
    constructor(private pairsService: PairsService) {}

    @ApiOperation({
        summary: 'Створення пар санта-одержувач для зареєстрованих учасників',
    })
    @ApiResponse({ status: 201, type: Object })
    @Post('shuffle')
    async shuffle() {
        return this.pairsService.shuffle();
    }

    @ApiOperation({ summary: 'Переглянути всі створені пари санта-одержувач' })
    @ApiResponse({ status: 200, type: [Pair] })
    @Get('fetch')
    async fetchAll() {
        return this.pairsService.getAll();
    }
}
