const got = require('got');
const isIp = require('is-ip');
const tryEach = require('async/tryEach');
const shuffle = require('lodash.shuffle');
const {compose, split, replace, trim} = require('ramda');

const Env = use('Env');

const cleanProviderUrl = (url, ip) => {
  url = replace('{ip}', ip, url);

  if (!ip) {
    return replace(/(?<!:)\/{2,}/g, '/', url);
  }

  return url;
};

const geoTransformer = (geo) => {
  const {
    ip,
    query,
    city,
    latitude,
    lat,
    longitude,
    lon,
    loc = '',
    country,
    country_name,
  } = geo;

  const [la, lo] = split(',', loc);

  return {
    ip: ip || query,
    latitude: +(latitude || lat || la),
    longitude: +(longitude || lon || lo),
    city: city && compose(trim, replace(/city$/i, ''))(city),
    country: country || country_name,
  };
};

const providers = split('|')(Env.get('APP_DETECT_PROVIDER'));

class GeoDetector {
  async handle({request, params}, next) {
    const currentIp = isIp.v4(params.ip) ? params.ip : request.realIp;

    const geo = await tryEach(
      shuffle(providers).map((url) => (callback) => {
        url = cleanProviderUrl(url, currentIp ? currentIp : '');

        return got(url, {
          responseType: 'json',
          retry: 0,
        })
          .then((response) => {
            const geo = geoTransformer(response.body);

            if (!geo.city) {
              throw new Error('Not found');
            }

            callback(null, geo);
          })
          .catch((err) => {
            const error = new Error(err.message);

            error.status = err.response ? err.response.statusCode : 500;

            callback(error);
          });
      }),
    );

    request.geo = geo;

    await next();
  }
}

module.exports = GeoDetector;
