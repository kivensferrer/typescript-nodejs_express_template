import { LogTransport, LogMessage } from '../index';

export class ConsoleTransport implements LogTransport {
  log(entry: LogMessage): void {
    const { instanceId, level, message, context, timestamp, meta } = entry;
    const ctx = context ? `[${context}]` : '';
    const metaStr = meta ? JSON.stringify(meta) : '';
    switch (level) {
      case 'debug':
      case 'info':
        console.log(`${instanceId ?? 'unknown'} ${timestamp} ${level.toUpperCase()} ${ctx} ${message}`, metaStr);
        break;
      case 'warn':
        console.warn(`${instanceId ?? 'unknown'} ${timestamp} ${level.toUpperCase()} ${ctx} ${message}`, metaStr);
        break;
      case 'error':
        console.error(`${instanceId ?? 'unknown'} ${timestamp} ${level.toUpperCase()} ${ctx} ${message}`, metaStr);
        break;
    }
  }
}
