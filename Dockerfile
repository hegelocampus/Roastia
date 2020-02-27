FROM node:13.8.0-alpine3.11 as build
WORKDIR /usr/src/react_app

RUN apk add yarn

COPY packages/client/package.json yarn.lock ./

ARG NODE_ENV=production
RUN yarn --production --silent
ENV PATH /usr/src/app/react_app/node_modules/.bin:$PATH

COPY packages/client/. /usr/src/react_app/
ENV SASS_PATH node_modules:src/sass
RUN yarn run build --production

FROM node:13.8.0-alpine3.11
WORKDIR /roastia

RUN apk add yarn

COPY --from=build /usr/src/react_app/build /roastia/packages/client/build/

COPY package.json yarn.lock /roastia/
COPY packages/server /roastia/packages/server
RUN yarn --production --silent

EXPOSE 5000

CMD ["yarn", "server:production"]

