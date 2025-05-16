import { NestFactory } from '@nestjs/core';
import { AuditLogModule } from './audit-log/audit-log.module';
import { AuditLogService } from './audit-log/audit-log.service';

async function bootstrap() {
  const app = await NestFactory.create(AuditLogModule);

  await app.listen(process.env.PORT || 3000)
  console.log("Audity is now listening!")
}
bootstrap();
