import { Module } from '@nestjs/common';
import { AuditLogService } from './audit-log.service';
import { AuditLogController } from './audit-log.controller';
import { PrismaService } from 'prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        AuditLogModule,
    ],
    providers: [AuditLogService, PrismaService],
    controllers: [AuditLogController],
    exports: [AuditLogService],
})
export class AuditLogModule { }
