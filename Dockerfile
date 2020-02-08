FROM node:10.13.0-alpine as build
WORKDIR /usr/src/react_app

RUN apk add yarn

COPY packages/client/package.json ./

ARG NODE_ENV=production
RUN yarn --prod --silent
ENV PATH /usr/src/app/react_app/node_modules/.bin:$PATH

COPY packages/client/. /usr/src/react_app/
ENV SASS_PATH node_modules:src/sass
RUN yarn run build --production

FROM node:10.13.0-alpine
WORKDIR /my_app

ENV NODE_ENV=production

RUN apk add yarn

COPY --from=build /usr/src/react_app/build /my_app/packages/client/build/

COPY ./ /my_app/
RUN yarn --prod --silent

EXPOSE 5000

CMD ["yarn", "run", "server:production"]

