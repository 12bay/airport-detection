/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', 'AirportController.index').middleware(['city']);

Route.get('/geo', ({request, response}) => {
  const {realIp: ip, city} = request;

  response.send({ip, ips: request.ips(), city});
}).middleware(['city']);
