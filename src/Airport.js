class Airport {
  constructor(instance) {
    this._instance = instance;
  }

  search(query) {
    return this._instance.search(query);
  }
}

module.exports = Airport;
