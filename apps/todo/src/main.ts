import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { TodoModule } from './todo.module';
import { join } from 'path';
import { protoNames } from './const/proto-names';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TodoModule,
    {
      transport: Transport.GRPC,
      options: {
        package: protoNames.todo,
        protoPath: join(__dirname, '../../proto', protoNames.todo + '.proto'),
        url: '0.0.0.0:5051',
      },
    },
  );
  await app.listen();
}
bootstrap();
