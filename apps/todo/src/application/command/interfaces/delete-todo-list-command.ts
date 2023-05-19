import { ICommand } from '@nestjs/cqrs';

export class DeleteTodoListCommand implements ICommand {
  constructor(readonly id: string) {}
}
