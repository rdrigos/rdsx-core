import { StatusCodes } from '@/lib/enums/status-codes';
import { Request } from '@/lib/http/request';
import http from 'node:http';
import util from 'node:util';

type Handler = (request: Request, reply: http.ServerResponse) => Promise<void>;

interface ListenOptions {
  port: number;
  host?: string;
}

export class Server {
  private readonly endpoints: Map<string, Handler>;
  private readonly server: http.Server;

  constructor() {
    this.endpoints = new Map();
    this.server = http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {
      this.handle(new Request(request), response);
    });
  }

  private async handle(request: Request, response: http.ServerResponse): Promise<http.ServerResponse | undefined> {
    const key: string = util.format('%s %s', request.method, request.url);
    const handler: Handler | undefined = this.endpoints.get(key);

    if (!handler) {
      return response.writeHead(StatusCodes.NOT_FOUND, { 'content-type': 'application/json' }).end(
        JSON.stringify({
          message: util.format('%s %s not found', request.method, request.url),
          error: 'Not Found',
          statusCode: StatusCodes.NOT_FOUND,
        }),
      );
    }

    await handler(request, response);
  }

  public async listen({ port, host }: ListenOptions): Promise<void> {
    this.server.listen(port, host);
    console.log('Sever is runing...');
  }
}
