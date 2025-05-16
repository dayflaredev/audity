import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuditLogPayload } from './audit-log.interface';
import { QueryAuditLogDto } from './dto/query-audit-log.dto';

@Injectable()
export class AuditLogService {
    constructor(private readonly prisma: PrismaService) { }

    async create(payload: AuditLogPayload) {
        return this.prisma.auditLog.create({
            data: payload,
        });
    }

    async findAll(query: QueryAuditLogDto) {
        const {
            actor,
            action,
            target,
            from,
            to,
            metaSearch,
            limit = 50,
            offset = 0,
            orderBy = 'desc',
        } = query;

        const where: any = {};

        if (actor) where.actor = { contains: actor };
        if (action) where.action = { contains: action };
        if (target) where.target = { contains: target };
        if (from || to) where.createdAt = {};
        if (from) where.createdAt.gte = new Date(from);
        if (to) where.createdAt.lte = new Date(to);
        if (metaSearch) where.meta = { contains: metaSearch };

        return this.prisma.auditLog.findMany({
            where,
            take: limit,
            skip: offset,
            orderBy: { createdAt: orderBy },
        });
    }

}
