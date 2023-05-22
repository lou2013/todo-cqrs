import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { protoNames } from 'lib/const/proto-names';
import { TODOS_SERVICE_NAME, TODO_PACKAGE_NAME } from 'lib/proto/todo/todo.pb';
import { join } from 'path';
import { TodoGateWayController } from './controller/todo-gateway.controller';
import { TodoListGateWayController } from './controller/todo-list-gateway.controller';

@Module({
  imports: [
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
  controllers: [TodoListGateWayController, TodoGateWayController],
  providers: [],
})
export class TodoGateWayModule {}
