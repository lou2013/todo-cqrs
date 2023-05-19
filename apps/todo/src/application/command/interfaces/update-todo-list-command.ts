import { ICommand } from '@nestjs/cqrs';

export class UpdateTodoListCommand implements ICommand {
  constructor(
    readonly id: string,
    readonly name?: number,
    readonly description?: string,
  ) {}
}
