import { NestFactory } from '@nestjs/core';
import { GateWayModule } from './gateway.module';
import { SerializerInterceptor } from './common/interceptors/serializer.interceptor';
import { GlobalValidationPipe } from './common/pipes/global-validation.pipe';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(GateWayModule);
  app.useGlobalInterceptors(SerializerInterceptor(app));
  app.useGlobalPipes(GlobalValidationPipe);
  await app.listen(3000);
}
bootstrap();
