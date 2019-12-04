const got = require('got');
const tryEach = require('async/tryEach');
const shuffle = require('lodash.shuffle');
const {compose, map, split, replace, zipObj, trim} = require('ramda');

const Env = use('Env');

const cleanProviderUrl = (url, ip) => {
  url = replace('{ip}', ip, url);

  if (!ip) {
    return replace(/(?<!:)\/{2,}/g, '/', url);
  }

  return url;
};

const providers = compose(
  map(compose(zipObj(['url', 'field']), split('\\'))),
  split('|'),
)(Env.get('APP_DETECT_PROVIDER'));

class CityDetector {
  async handle({request}, next) {
    const {realIp} = request;

    const city = await tryEach(
      shuffle(providers).map(({url, field}) => callback => {
        url = cleanProviderUrl(url, realIp ? realIp : '');

        return got(url, {
          responseType: 'json',
          retry: 0,
        })
          .then(response => {
            const city = response.body[field];

            if (!city) {
              throw new Error('Not found');
            }

            callback(null, city);
          })
          .catch(err => {
            const error = new Error(err.message);

            error.status = err.response ? err.response.statusCode : 500;

            callback(error);
          });
      }),
    );

    request.city = compose(trim, replace(/city$/i, ''))(city);

    await next();
  }
}

module.exports = CityDetector;
