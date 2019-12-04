const got = require('got');
const tryEach = require('async/tryEach');
const shuffle = require('lodash.shuffle');
const {compose, map, split, zipObj} = require('ramda');

const Env = use('Env');

const providers = compose(
  shuffle,
  map(compose(zipObj(['url', 'field']), split('\\'))),
  split('|'),
)(Env.get('APP_DETECT_PROVIDER'));

class CityDetector {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({request}, next) {
    request.city = await tryEach(
      providers.map(({url, field}) => callback => {
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

    await next();
  }
}

module.exports = CityDetector;
