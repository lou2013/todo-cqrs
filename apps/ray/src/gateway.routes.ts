import { Routes } from '@nestjs/core';
import { TodoGateWayModule } from './modules/todo/todo-gateway.module';
import { GateWayModule } from './gateway.module';

export const Router: Routes = [
  {
    path: '/',
    module: GateWayModule,
    children: [{ path: 'todo', module: TodoGateWayModule }],
  },
];
