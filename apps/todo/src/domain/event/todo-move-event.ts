import { IEvent } from '@nestjs/cqrs';

export class TodoMoveEvent implements IEvent {
  constructor(readonly todoId: string, readonly todoDestinationId: string) {}
}
