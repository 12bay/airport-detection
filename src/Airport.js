const {pick} = require('ramda');

class Airport {
  constructor(instance, raw) {
    this._instance = instance;
    this._raw = raw;
  }

  raw() {
    return this._raw;
  }

  rawCoordinates() {
    return this._raw.map(pick(['latitude', 'longitude']));
  }

  search(query) {
    return this._instance.search(query);
  }
}

module.exports = Airport;
