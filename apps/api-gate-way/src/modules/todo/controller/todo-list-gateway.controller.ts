import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  OnModuleInit,
  Inject,
  Query,
} from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { MongoIdParam } from 'apps/api-gate-way/src/common/decorator/mongo-id-parameter.decorator';
import {
  todosServiceClient,
  TODOS_SERVICE_NAME,
  UpdateTodoList,
} from 'lib/proto/todo/todo.pb';
import { catchError, lastValueFrom, throwError } from 'rxjs';
import { CreateTodoListDto } from '../dto/create-todo-list.dto';
import { GetAllTodoListDto } from '../dto/get-all-todo-list.dto';
import { GetPaginatedTodoListDto } from '../dto/get-paginated-todo-list.dto';
import { GetTodoListDto } from '../dto/get-todo-list.dto';
import { PaginateRequestDto } from '../dto/paginate-request.dto';
import { UpdateTodoListDto } from '../dto/update-todo-list.dto';
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

  @Get('/paginate')
  @ApiQuery({ type: PaginateRequestDto })
  @ApiResponse({ type: GetPaginatedTodoListDto })
  async findPaginate(
    @Query() query: PaginateRequestDto,
  ): Promise<GetPaginatedTodoListDto> {
    const data = await lastValueFrom(
      this.service.findPaginatedTodoList(query).pipe(
        catchError((err) => {
          return throwError(() => new RpcException(err));
        }),
      ),
    );
    return new GetPaginatedTodoListDto(data);
  }

  @Get('/:id')
  @ApiParam({ name: 'id' })
  async findById(@MongoIdParam('id') id: string): Promise<GetTodoListDto> {
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
  async findAll(): Promise<GetAllTodoListDto> {
    const data = await lastValueFrom(
      this.service.findAllTodoList({}).pipe(
        catchError((err) => {
          return throwError(() => new RpcException(err));
        }),
      ),
    );
    return new GetAllTodoListDto(data);
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
  @ApiParam({ name: 'id' })
  async update(
    @Body() updateDto: UpdateTodoListDto,
    @MongoIdParam('id') id: string,
  ): Promise<void> {
    await lastValueFrom(
      this.service.updateTodoList({ ...updateDto, id }).pipe(
        catchError((err) => {
          return throwError(() => new RpcException(err));
        }),
      ),
    );
    return;
  }

  @Delete('/:id')
  @ApiParam({ name: 'id' })
  async delete(@MongoIdParam('id') id: string): Promise<void> {
    await lastValueFrom(
      this.service.deleteTodoList({ id }).pipe(
        catchError((err) => {
          return throwError(() => new RpcException(err));
        }),
      ),
    );
    return;
  }
}
