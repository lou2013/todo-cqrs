import { ICommand } from '@nestjs/cqrs';

export class UpdateTodoCommand implements ICommand {
  constructor(readonly id: string, readonly todoListId: string) {}
}
