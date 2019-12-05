const {isEmpty} = require('ramda');

const Airport = use('Airport');

const CityException = use('App/Exceptions/CityException');
const AirportException = use('App/Exceptions/AirportException');

class AirportController {
  index({request, response}) {
    const {city} = request;

    if (!city) {
      throw new CityException();
    }

    const results = Airport.search(city);

    if (isEmpty(results)) {
      throw new AirportException();
    }

    response.send(results[0]);
  }
}

module.exports = AirportController;
