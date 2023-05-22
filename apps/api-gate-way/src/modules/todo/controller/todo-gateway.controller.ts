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
import { todosServiceClient, TODOS_SERVICE_NAME } from 'lib/proto/todo/todo.pb';
import { catchError, lastValueFrom, throwError } from 'rxjs';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { GetAllTodoDto } from '../dto/get-all-todo.dto';
import { GetPaginateTodoDto } from '../dto/get-paginate-todo.dto';
import { GetTodoDto } from '../dto/get-todo.dto';
import { MoveTodoDto } from '../dto/move-todo.dto';
import { PaginateRequestDto } from '../dto/paginate-request.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';

@Controller()
export class TodoGateWayController implements OnModuleInit {
  private service: todosServiceClient;

  @Inject(TODOS_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.service =
      this.client.getService<todosServiceClient>(TODOS_SERVICE_NAME);
  }

  @Post('/')
  async create(@Body() Dto: CreateTodoDto): Promise<void> {
    await lastValueFrom(
      this.service.createTodo({ ...Dto }).pipe(
        catchError((err) => {
          return throwError(() => new RpcException(err));
        }),
      ),
    );
    return;
  }

  @Post('/move/:id')
  @ApiParam({ name: 'id' })
  async move(
    @Body() Dto: MoveTodoDto,
    @MongoIdParam('id') id: string,
  ): Promise<void> {
    try {
      await lastValueFrom(
        this.service
          .moveTodo({ todoId: id, newTodoListId: Dto.newTodoListId })
          .pipe(
            catchError((err) => {
              return throwError(() => new RpcException(err));
            }),
          ),
      );
      return;
    } catch (error) {
      console.log(error instanceof RpcException);
    }
  }

  @ApiQuery({ type: PaginateRequestDto })
  @ApiResponse({ type: GetPaginateTodoDto })
  @Get('/paginate')
  async findPaginate(
    @Query() paginateRequestDto: PaginateRequestDto,
  ): Promise<GetPaginateTodoDto> {
    const data = await lastValueFrom(
      this.service.findPaginatedTodo(paginateRequestDto).pipe(
        catchError((err) => {
          return throwError(() => new RpcException(err));
        }),
      ),
    );
    return new GetPaginateTodoDto(data);
  }

  @Get('/:id')
  @ApiParam({ name: 'id' })
  @ApiResponse({ type: GetTodoDto })
  async findById(@MongoIdParam('id') id: string): Promise<GetTodoDto> {
    const data = await lastValueFrom(
      this.service.findTodoById({ id }).pipe(
        catchError((err) => {
          return throwError(() => new RpcException(err));
        }),
      ),
    );
    return new GetTodoDto(data);
  }

  @Get('/')
  @ApiResponse({ type: GetAllTodoDto })
  async findAll(): Promise<GetAllTodoDto> {
    const data = await lastValueFrom(
      this.service.findAllTodo({}).pipe(
        catchError((err) => {
          return throwError(() => new RpcException(err));
        }),
      ),
    );
    return new GetAllTodoDto(data);
  }

  @Patch('/:id')
  @ApiParam({ name: 'id' })
  async update(
    @Body() updateDto: UpdateTodoDto,
    @MongoIdParam('id') id: string,
  ): Promise<void> {
    await lastValueFrom(
      this.service.updateTodo({ ...updateDto, id }).pipe(
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
      this.service.deleteTodo({ id }).pipe(
        catchError((err) => {
          return throwError(() => new RpcException(err));
        }),
      ),
    );
    return;
  }
}
