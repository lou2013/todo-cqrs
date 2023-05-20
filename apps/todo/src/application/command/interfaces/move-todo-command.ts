import { ICommand } from '@nestjs/cqrs';

export class MoveTodoCommand implements ICommand {
  constructor(readonly id: string, readonly todoListId: string) {}
}
