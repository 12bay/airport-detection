# Airport Detection

> Just return the current Airport information

## Development

Copy `.env.example` to `.env` and update your environment variables.

**Note**: You need provides your IP geolocation service provider: check the `APP_DETECT_PROVIDER` variable and more advance in `Tech stack` section

```bash
$ yarn install
$ adonis serve --dev
```

## Production

> You can deploy with Docker container or manually

### Manual deploy

```bash
$ yarn install
$ yarn start
```

### Docker deploy

```bash
$ docker run --restart=unless-stopped -p 3333:3333 -d 12bayvn/airport-detection
```

## Usage

### Automatically your IP geolocation

```bash
$ curl https://ap.12bay.dev
```

```json
{
  "name": "Tan Son Nhat International Airport",
  "city": "Ho Chi Minh City",
  "country": "Vietnam",
  "iata": "SGN",
  "icao": "VVTS",
  "latitude": "10.8187999725",
  "longitude": "106.652000427",
  "altitude": "33",
  "timezone": "7",
  "dst": "U",
  "tz_name": "Asia/Saigon"
}
```

### Manually specifying the IP Address

```bash
$ curl https://ap.12bay.dev/27.67.41.250
```

```json
{
  "name": "Noi Bai International Airport",
  "city": "Hanoi",
  "country": "Vietnam",
  "iata": "HAN",
  "icao": "VVNB",
  "latitude": "21.221200942993164",
  "longitude": "105.80699920654297",
  "altitude": "39",
  "timezone": "7",
  "dst": "U",
  "tz_name": "Asia/Saigon"
}
```

### Manually specifying the coordinate (Recommended way)

```bash
$ curl https://ap.12bay.dev/13.2011066/108.7849624
```

```json
{
  "name": "Dong Tac Airport",
  "city": "Tuy Hoa",
  "country": "Vietnam",
  "iata": "TBB",
  "icao": "VVTH",
  "latitude": "13.049599647500001",
  "longitude": "109.333999634",
  "altitude": "20",
  "timezone": "7",
  "dst": "U",
  "tz_name": "Asia/Saigon"
}
```

### Debug

```bash
$ curl https://ap.12bay.dev/debug
```

```json
{
  "ip": "27.71.207.174",
  "latitude": 10.8142,
  "longitude": 106.6438,
  "city": "Ho Chi Minh",
  "country": "Vietnam",
  "ips": []
}
```

## Tech stack

- [Adonis Framework](https://adonisjs.com)
- [flexsearch](https://github.com/nextapps-de/flexsearch)
- Airports data: https://github.com/timrogers/airports/tree/master/data
- IP geolocation service providers: **ip-api.com**, **ipinfo.io**, **ipdata.co**, **ipgeolocation.io** or any

## License

MIT © [Nghiep](https://nghiepit.dev)
