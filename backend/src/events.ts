import { EventEmitter } from 'node:events';

export type RealtimeEventEnvelope = {
  event: string;
  data: unknown;
  at: string;
};

export type WsClient = {
  send(data: string): void;
  on(event: 'close', listener: () => void): void;
};

export type SseClient = {
  write(data: string): void;
  end(): void;
  on(event: 'close', listener: () => void): void;
};

export class RealtimeHub {
  private readonly sockets = new Set<WsClient>();
  private readonly streams = new Set<SseClient>();

  constructor(private readonly sysEvents: EventEmitter) {
    this.sysEvents.setMaxListeners(100);
  }

  publish(event: string, data: unknown): void {
    const envelope: RealtimeEventEnvelope = {
      event,
      data,
      at: new Date().toISOString()
    };

    this.sysEvents.emit(event, envelope);
    this.sysEvents.emit('broadcast', envelope);

    const payload = JSON.stringify(envelope);
    for (const socket of this.sockets) {
      try {
        socket.send(payload);
      } catch {
        this.sockets.delete(socket);
      }
    }

    const ssePayload = `event: ${event}\ndata: ${payload}\n\n`;
    for (const stream of this.streams) {
      try {
        stream.write(ssePayload);
      } catch {
        this.streams.delete(stream);
      }
    }
  }

  subscribeSocket(socket: WsClient): void {
    this.sockets.add(socket);
    socket.on('close', () => {
      this.sockets.delete(socket);
    });
  }

  subscribeSse(stream: SseClient): void {
    this.streams.add(stream);
    stream.on('close', () => {
      this.streams.delete(stream);
    });
  }

  getSocketCount(): number {
    return this.sockets.size;
  }

  close(): void {
    for (const socket of this.sockets) {
      this.sockets.delete(socket);
    }

    for (const stream of this.streams) {
      try {
        stream.end();
      } catch {
        // Ignore shutdown failures.
      }
      this.streams.delete(stream);
    }
  }
}