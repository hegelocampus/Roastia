FROM node:13.8.0-alpine3.11 as build
WORKDIR /app/client

RUN apk add yarn

COPY packages/client/package.json .

ARG NODE_ENV=production
RUN yarn --production --silent
ENV PATH /app/client/node_modules/.bin:$PATH

COPY packages/client /app/client/
ENV SASS_PATH node_modules:src/sass
RUN yarn run build --production

FROM node:13.8.0-alpine3.11
WORKDIR /app/server

COPY --from=build /app/client/build/ ../client/build

RUN apk add yarn

ADD packages/server /app/server/
RUN yarn --production

EXPOSE 5000

CMD ["yarn", "start:production"]

