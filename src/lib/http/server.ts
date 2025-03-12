import { StatusCodes } from '@/lib/enums/status-codes';
import http from 'node:http';
import util from 'node:util';

type Handler = (request: http.IncomingMessage, reply: http.ServerResponse) => Promise<void>;

interface ListenOptions {
  port: number;
  host?: string;
}

export class Server {
  private readonly endpoints: Map<string, Handler>;
  private readonly server: http.Server;

  constructor() {
    this.endpoints = new Map();
    this.server = http.createServer(this.handle.bind(this));
  }

  private async handle(req: http.IncomingMessage, res: http.ServerResponse): Promise<http.ServerResponse | undefined> {
    const key: string = util.format('%s %s', req.method, req.url);
    const handler: Handler | undefined = this.endpoints.get(key);

    if (!handler) {
      return res.writeHead(StatusCodes.NOT_FOUND, { 'content-type': 'application/json' }).end(
        JSON.stringify({
          message: util.format('%s %s not found', req.method, req.url),
          error: 'Not Found',
          statusCode: StatusCodes.NOT_FOUND,
        }),
      );
    }

    await handler(req, res);
  }

  public async listen({ port, host }: ListenOptions): Promise<void> {
    this.server.listen(port, host);
  }
}
