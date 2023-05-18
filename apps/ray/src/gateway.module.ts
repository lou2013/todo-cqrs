import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { Router } from './gateway.routes';
import { TodoGateWayModule } from './modules/todo/todo-gateway.module';

@Module({
  imports: [TodoGateWayModule, RouterModule.register(Router)],
  controllers: [],
  providers: [],
})
export class GateWayModule {}
