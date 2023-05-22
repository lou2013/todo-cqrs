import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { isMongoId } from 'class-validator';
import { Request } from 'express';

// eslint-disable-next-line unicorn/prevent-abbreviations
export const MongoIdParam = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    const id = request.params[data];
    if (!id || !isMongoId(id)) {
      throw new BadRequestException('Invalid mongo id');
    }
    return id;
  },
);
