import { randomUUID } from 'crypto';

const SERVICE_INSTANCE_ID = process.env.SERVICE_INSTANCE_ID ?? randomUUID();

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogMessage {
  level: LogLevel;
  message: string;
  context?: string;
  meta?: Record<string, any>;
  timestamp?: string;
  instanceId: string;
}

/**
 * Base transport interface — each output (console, DB, file, etc.)
 * implements this.
 */
export interface LogTransport {
  log(entry: LogMessage): void | Promise<void>;
}

/**
 * Central Logger: fan-out to multiple transports.
 */
class LoggerClass {
  private transports: LogTransport[] = [];

  register(t: LogTransport) { this.transports.push(t); }

  private emit(level: LogLevel, message: string, context?: string, meta?: Record<string, any>) {
    const entry: LogMessage = {
      level,
      message,
      context,
      meta,
      timestamp: new Date().toISOString(),
      instanceId: SERVICE_INSTANCE_ID, 
    };
    for (const t of this.transports) t.log(entry);
  }

  info(m: string, c?: string, meta?: any)  { this.emit('info', m, c, meta); }
  warn(m: string, c?: string, meta?: any)  { this.emit('warn', m, c, meta); }
  error(m: string, c?: string, meta?: any) { this.emit('error', m, c, meta); }
  debug(m: string, c?: string, meta?: any) { this.emit('debug', m, c, meta); }
}

export const Logger = new LoggerClass();
