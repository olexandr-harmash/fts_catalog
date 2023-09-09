import { networkInterfaces, NetworkInterfaceInfo } from 'os';
import { Server } from '.';

export function ServerListener(this: Server): void {
  this._server.listen(this._config.port, (): void => {
    // Show info about running server
    const addresses: string[] = [`localhost`];
    const ifaces = networkInterfaces();
    Object.keys(ifaces).forEach((ifname: string): void => {
      ifaces[ifname]?.forEach((iface: NetworkInterfaceInfo): void => {
        // Skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        if (iface.family !== 'IPv4' || iface.internal !== false) {
          return;
        }
        addresses.push(iface.address);
      });
    });
    this._logger.info(
      `Listening in ${process.env.NODE_ENV} mode at:\n${addresses
        .map((address: string): string => `${this._config.protocol}://${address}:${this._config.port}`)
        .join('\n')}`
    );
  });
};