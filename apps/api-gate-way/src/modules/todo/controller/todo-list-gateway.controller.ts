import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  OnModuleInit,
  Inject,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { todosServiceClient, TODOS_SERVICE_NAME } from 'lib/proto/todo/todo.pb';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';

@Controller('/list')
export class TodoListGateWayController implements OnModuleInit {
  private service: todosServiceClient;

  @Inject(TODOS_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.service =
      this.client.getService<todosServiceClient>(TODOS_SERVICE_NAME);
  }

  getHello(): string {
    return 'Hello Worlds!';
  }

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
