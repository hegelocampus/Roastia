FROM node:10.13.0-alpine as build
WORKDIR /usr/src/react_app

RUN apk add yarn

COPY client/package.json client/yarn.lock ./

ARG NODE_ENV=production
RUN yarn --silent
ENV PATH /usr/src/app/react_app/node_modules/.bin:$PATH

COPY client/. /usr/src/react_app/
ENV SASS_PATH node_modules:src/sass
RUN yarn run build --production

FROM node:10.13.0-alpine
WORKDIR /my_app

ENV NODE_ENV=production

RUN apk add yarn

COPY --from=build /usr/src/react_app/build /my_app/client/build/

COPY package.json yarn.lock /my_app/
RUN yarn --prod --silent

COPY . /my_app/

EXPOSE 5000

CMD ["yarn", "run", "server:production"]

