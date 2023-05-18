import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TodoGateWayController } from './controller/todo-gateway.controller';
import { TodoGateWayService } from './service/todo-gateway.service';

@Module({
  imports: [],
  controllers: [TodoGateWayController],
  providers: [TodoGateWayService],
})
export class TodoGateWayModule {}
