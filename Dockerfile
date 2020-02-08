FROM node:10.13.0-alpine as build
WORKDIR /usr/src/react_app

RUN apk add yarn

COPY packages/client/package.json ./

ARG NODE_ENV=production
RUN yarn --production --silent
ENV PATH /usr/src/app/react_app/node_modules/.bin:$PATH

COPY packages/client/. /usr/src/react_app/
ENV SASS_PATH node_modules:src/sass
RUN yarn run build --production

FROM node:10.13.0-alpine
WORKDIR /my_app

RUN apk add yarn

COPY --from=build /usr/src/react_app/build /my_app/packages/client/build/

COPY package.json /my_app/
COPY packages/server /my_app/packages/
RUN yarn --production --silent

EXPOSE 5000

CMD ["yarn", "server:production"]

