FROM node:12.11.1-alpine

LABEL maintainer="Nghiep <me@nghiepit.dev>"

ARG PORT
ARG APP_KEY
ARG APP_DETECT_PROVIDER

ENV NODE_ENV production
ENV PORT $PORT
ENV APP_KEY $APP_KEY
ENV APP_DETECT_PROVIDER $APP_DETECT_PROVIDER

WORKDIR /usr/src/app

COPY . .

RUN yarn install

EXPOSE $PORT

ENTRYPOINT yarn start
