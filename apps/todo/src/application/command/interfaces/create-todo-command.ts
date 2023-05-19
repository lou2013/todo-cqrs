import { ICommand } from '@nestjs/cqrs';

export class CreateTodoCommand implements ICommand {
  constructor(
    readonly priority: number,
    readonly title: string,
    readonly todoListId: string,
  ) {}
}
