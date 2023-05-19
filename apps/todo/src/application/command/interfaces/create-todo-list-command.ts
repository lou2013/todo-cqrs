import { ICommand } from '@nestjs/cqrs';

export class CreateTodoListCommand implements ICommand {
  constructor(readonly description: string, readonly name: string) {}
}
