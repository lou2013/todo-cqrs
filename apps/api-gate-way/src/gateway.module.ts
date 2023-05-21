import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { Router } from './gateway.routes';
import { TodoGateWayModule } from './modules/todo/todo-gateway.module';

@Module({
  imports: [RouterModule.register(Router), TodoGateWayModule],
  controllers: [],
  providers: [],
  exports: [TodoGateWayModule],
})
export class GateWayModule {}
