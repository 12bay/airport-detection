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

> You can deploy with Docker container or manual

### Manual deploy

```bash
$ yarn install
$ yarn start
```

### Docker deploy

```bash
$ docker run --restart=unless-stopped -p 3333:3333 -d docker.pkg.github.com/12bay/airport-detection/airport-detection
```

## Tech stack

- [Adonis Framework](https://adonisjs.com)
- [flexsearch](https://github.com/nextapps-de/flexsearch)
- Airports data: https://github.com/timrogers/airports/tree/master/data
- IP geolocation service providers: **ip-api.com**, **ipinfo.io**, **ipdata.co**, **ipgeolocation.io** or any

## License

MIT © [Nghiep](https://nghiepit.dev)
