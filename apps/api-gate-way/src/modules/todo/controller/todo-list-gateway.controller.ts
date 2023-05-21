import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  OnModuleInit,
  Inject,
  Param,
} from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { ApiParam } from '@nestjs/swagger';
import { todosServiceClient, TODOS_SERVICE_NAME } from 'lib/proto/todo/todo.pb';
import { catchError, lastValueFrom, throwError } from 'rxjs';
import { CreateTodoListDto } from '../dto/create-todo-list.dto';
import { GetTodoListDto } from '../dto/get-todo-list.dto';

@Controller('/list')
export class TodoListGateWayController implements OnModuleInit {
  private service: todosServiceClient;

  @Inject(TODOS_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.service =
      this.client.getService<todosServiceClient>(TODOS_SERVICE_NAME);
  }

  @Get('/:id')
  @ApiParam({ name: 'id' })
  async findById(@Param('id') id: string): Promise<GetTodoListDto> {
    const data = await lastValueFrom(
      this.service.findTodoListById({ id }).pipe(
        catchError((err) => {
          return throwError(() => new RpcException(err));
        }),
      ),
    );
    return new GetTodoListDto(data);
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
  async create(@Body() createDto: CreateTodoListDto): Promise<void> {
    await lastValueFrom(
      this.service.createTodoList({ ...createDto }).pipe(
        catchError((err) => {
          return throwError(() => new RpcException(err));
        }),
      ),
    );
    return;
  }

  @Patch('/:id')
  update(@Body() updateDto: any): string {
    return '';
    // return this.appService.getHello();
  }

  @Delete('/:id')
  delete(): string {
    return '';
    // return this.appService.getHello();
  }
}
