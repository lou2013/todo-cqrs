import { Module } from '@nestjs/common';
import { TodoGateWayController } from './controller/todo-gateway.controller';

@Module({
  imports: [],
  controllers: [TodoGateWayController],
  providers: [],
})
export class TodoGateWayModule {}
