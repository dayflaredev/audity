export interface AuditLogPayload {
  actor: string;
  action: string;
  target?: string;
  meta?: Record<string, any>;
}