import { ICommand } from '@nestjs/cqrs';

export class Command implements ICommand {
  constructor(properties: any) {}
}
