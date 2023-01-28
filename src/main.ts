import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

const serviceName = 'gpt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle(`OpenAI API Documentation`)
    .setVersion('1.0')
    .addTag('GPT')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup(`/${serviceName}/swagger`, app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
