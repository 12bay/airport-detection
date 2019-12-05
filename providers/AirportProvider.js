const FlexSearch = require('flexsearch');

const {ServiceProvider} = require('@adonisjs/fold');

const airports = Object.values(use('App/airports.json'));

const searchEngine = new FlexSearch({
  encode: 'simple',
  doc: {
    id: 'iata',
    field: ['city', 'name'],
    cache: true,
  },
}).add(airports);

class AirportProvider extends ServiceProvider {
  register() {
    this.app.singleton('Airport', () => {
      return new (require('../src/Airport'))(searchEngine);
    });
  }
}

module.exports = AirportProvider;
