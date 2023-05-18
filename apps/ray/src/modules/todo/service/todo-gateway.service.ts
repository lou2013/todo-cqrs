import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class TodoGateWayService implements OnModuleInit {
  // private svc: BookServiceClient;

  // @Inject(BOOK_SERVICE_NAME)
  // private readonly client: ClientGrpc;

  public onModuleInit(): void {
    // this.svc = this.client.getService<BookServiceClient>(BOOK_SERVICE_NAME);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
