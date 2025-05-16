import { IsString, IsOptional, IsObject } from 'class-validator';

export class CreateAuditLogDto {
  @IsString()
  actor: string;

  @IsString()
  action: string;

  @IsOptional()
  @IsString()
  target?: string;

  @IsOptional()
  @IsObject()
  meta?: object;
}
