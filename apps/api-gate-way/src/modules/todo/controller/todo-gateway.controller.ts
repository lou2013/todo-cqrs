import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  OnModuleInit,
} from '@nestjs/common';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';

@Controller()
export class TodoGateWayController implements OnModuleInit {
  // private svc: BookServiceClient;

  // @Inject(BOOK_SERVICE_NAME)
  // private readonly client: ClientGrpc;

  public onModuleInit(): void {
    // this.svc = this.client.getService<BookServiceClient>(BOOK_SERVICE_NAME);
  }

  getHello(): string {
    return 'Hello World!';
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
