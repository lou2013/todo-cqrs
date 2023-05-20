import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { protoNames } from 'lib/const/proto-names';
import { TODOS_SERVICE_NAME, TODO_PACKAGE_NAME } from 'lib/proto/todo/todo.pb';
import { join } from 'path';
import { Router } from './gateway.routes';
import { TodoGateWayModule } from './modules/todo/todo-gateway.module';

@Module({
  imports: [
    RouterModule.register(Router),
    TodoGateWayModule,
    ClientsModule.register({
      clients: [
        {
          name: TODOS_SERVICE_NAME,
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
      ],
    }),
  ],
  controllers: [],
  providers: [],
  exports: [TodoGateWayModule],
})
export class GateWayModule {}
