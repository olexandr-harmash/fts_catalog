import * as fs from 'fs';
import * as path from 'path';
import * as Http from 'http';
import * as Https from 'https';
import { Server } from '.';


export async function ServerInitializer(this: Server): Promise<Http.Server | Https.Server> {
  if (this._config.protocol !== 'https') {
    return Http.createServer(this.express);
  }

  // Set ssl certificate
  const sslDir: string = path.resolve(this._rootDir, 'config', 'ssl');
  const credentials = {
    key: fs.readFileSync(path.join(sslDir, 'server.key'), 'utf8'),
    cert: fs.readFileSync(path.join(sslDir, 'server.cer'), 'utf8')
  };

  // Create server instance
  return Https.createServer(credentials, this.express);
};