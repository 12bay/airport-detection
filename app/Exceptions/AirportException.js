const {LogicalException} = require('@adonisjs/generic-exceptions');

class AirportException extends LogicalException {
  constructor() {
    super('Airport not found', 404);
  }
}

module.exports = AirportException;
