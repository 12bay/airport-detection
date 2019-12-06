const {findNearest} = require('geolib');
const {pick, find, useWith, equals} = require('ramda');

const Airport = use('Airport');

const CityException = use('App/Exceptions/CityException');
const AirportException = use('App/Exceptions/AirportException');

class AirportController {
  index({request, response}) {
    const {city, latitude, longitude} = request.geo;

    if (!city) {
      throw new CityException();
    }

    const airports = Airport.search(city);

    const airportLoc = findNearest(
      {
        latitude,
        longitude,
      },
      airports.map(pick(['latitude', 'longitude'])),
    );

    if (!airportLoc) {
      throw new AirportException();
    }

    const airport = find(
      useWith(equals, [
        pick(['latitude', 'longitude']),
        pick(['latitude', 'longitude']),
      ])(airportLoc),
    )(airports);

    response.send(airport);
  }

  getAirportByCoordinate({params, response}) {
    const {latitude, longitude} = params;

    const airportLoc = findNearest(
      {
        latitude,
        longitude,
      },
      Airport.rawCoordinates(),
    );

    const airport = find(
      useWith(equals, [
        pick(['latitude', 'longitude']),
        pick(['latitude', 'longitude']),
      ])(airportLoc),
    )(Airport.raw());

    response.send(airport);
  }
}

module.exports = AirportController;
