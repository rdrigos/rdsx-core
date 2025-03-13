import cuid from '@paralleldrive/cuid2';
import { IncomingMessage } from 'node:http';
import util from 'node:util';

export class Request {
  public readonly id: string;
  public readonly startTime: number;
  public readonly raw: IncomingMessage;

  constructor(request: IncomingMessage) {
    this.id = util.format('req-%s', cuid.createId());
    this.startTime = performance.now();
    this.raw = request;
  }

  public get method(): string | undefined {
    return this.raw.method;
  }

  public get url(): string | undefined {
    return this.raw.url;
  }
}
