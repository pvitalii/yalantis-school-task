import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const port = process.env.PORT;

    const config = new DocumentBuilder()
        .setTitle('Тестове завдання Yalantis Node.js School')
        .setDescription('Документація REST API')
        .setVersion('1.0.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    await app.listen(port, () =>
        console.log(`Server started on port = ${port}`)
    );
}
bootstrap();
