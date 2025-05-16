import { Controller, Get, Post, Query, Body, UseGuards } from '@nestjs/common';
import { AuditLogService } from './audit-log.service';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { QueryAuditLogDto } from './dto/query-audit-log.dto';
import { ApiKeyGuard } from './audit-log.guard';

@UseGuards(ApiKeyGuard)
@Controller('audit-logs')
export class AuditLogController {
  constructor(private readonly auditLogService: AuditLogService) {}

  @Post()
  async create(@Body() dto: CreateAuditLogDto) {
    return this.auditLogService.create(dto);
  }

  @Get()
  async findAll(@Query() query: QueryAuditLogDto) {
    return this.auditLogService.findAll(query);
  }
}
