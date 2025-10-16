export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogMessage {
  level: LogLevel;
  message: string;
  context?: string;
  meta?: Record<string, any>;
  timestamp?: string;
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

  register(transport: LogTransport) {
    this.transports.push(transport);
  }

  private emit(level: LogLevel, message: string, context?: string, meta?: Record<string, any>) {
    const entry: LogMessage = {
      level,
      message,
      context,
      meta,
      timestamp: new Date().toISOString(),
    };
    for (const t of this.transports) {
      t.log(entry);
    }
  }

  debug(msg: string, ctx?: string, meta?: Record<string, any>) { this.emit('debug', msg, ctx, meta); }
  info(msg: string, ctx?: string, meta?: Record<string, any>)  { this.emit('info', msg, ctx, meta); }
  warn(msg: string, ctx?: string, meta?: Record<string, any>)  { this.emit('warn', msg, ctx, meta); }
  error(msg: string, ctx?: string, meta?: Record<string, any>) { this.emit('error', msg, ctx, meta); }
}

export const Logger = new LoggerClass();
