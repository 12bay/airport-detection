const FlexSearch = require('flexsearch');

const CityException = use('App/Exceptions/CityException');
const AirportException = use('App/Exceptions/AirportException');

const airports = Object.values(use('App/airports.json'));

const airportSearchEngine = new FlexSearch({
  encode: 'simple',
  doc: {
    id: 'iata',
    field: ['city', 'name'],
    cache: true,
  },
}).add(airports);

class AirportController {
  index({request, response}) {
    const {city} = request;

    if (!city) {
      throw new CityException();
    }

    const results = airportSearchEngine.search(city);

    if (!results || !results.length) {
      throw new AirportException();
    }

    response.send(results[0]);
  }
}

module.exports = AirportController;
