import { ICommand } from '@nestjs/cqrs';

export class DeleteTodoCommand implements ICommand {
  constructor(readonly id: string) {}
}
