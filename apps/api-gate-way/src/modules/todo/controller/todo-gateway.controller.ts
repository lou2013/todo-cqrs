import { Controller, Get, Post, Patch, Delete, Body } from '@nestjs/common';
import { TodoGateWayService } from '../service/todo-gateway.service';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';

@Controller()
export class TodoGateWayController {
  constructor(private readonly todoGateWayService: TodoGateWayService) {}

  @Get('/:id')
  findById(): string {
    return '';
    // return this.appService.getHello();
  }

  @Get('/')
  findAll(): string {
    return '';
    // return this.appService.getHello();
  }

  @Get('/')
  findPaginate(): string {
    return '';
    // return this.appService.getHello();
  }

  @Post('/')
  create(@Body() createDto: CreateTodoDto): string {
    return '';
    // return this.appService.getHello();
  }

  @Patch('/:id')
  update(@Body() updateDto: UpdateTodoDto): string {
    return '';
    // return this.appService.getHello();
  }

  @Delete('/:id')
  delete(): string {
    return '';
    // return this.appService.getHello();
  }
}
