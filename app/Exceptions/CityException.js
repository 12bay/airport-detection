'use strict';

const {LogicalException} = require('@adonisjs/generic-exceptions');

class CityException extends LogicalException {
  constructor() {
    super('City not found', 404);
  }
}

module.exports = CityException;
