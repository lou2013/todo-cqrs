import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { TodoModule } from './todo.module';
import { join } from 'path';
import { protoNames } from '../../../lib/const/proto-names';
import { TODO_PACKAGE_NAME } from 'lib/proto/todo/todo.pb';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TodoModule,
    {
      transport: Transport.GRPC,
      options: {
        package: TODO_PACKAGE_NAME,
        protoPath: join(
          __dirname,
          '..',
          '..',
          '..',
          '..',
          'proto',
          protoNames.todo + '.proto',
        ),
        url: '0.0.0.0:5051',
      },
    },
  );
  await app.listen();
}
bootstrap();
