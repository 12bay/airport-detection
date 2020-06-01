const {find, contains, startsWith} = require('ramda');

class RealIp {
  async handle({request}, next) {
    const ips = [request.ip(), ...request.ips()];
    const realIp = find((ip) => {
      if (
        !contains(':', ip) &&
        !startsWith('127.0.0.', ip) &&
        !startsWith('192.168.', ip) &&
        !startsWith('172.', ip)
      ) {
        return true;
      }

      return false;
    }, ips);

    request.realIp = realIp;

    await next();
  }
}

module.exports = RealIp;
