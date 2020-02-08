FROM node:10.13.0-alpine as build
WORKDIR /usr/src/react_app

ENV NODE_ENV=production

ENV PATH /usr/src/app/react_app/node_modules/.bin:$PATH

RUN apk add yarn

COPY package.json ./

RUN yarn --prod --silent

COPY ./ /usr/src/react_app/

ENV SASS_PATH node_modules:src/sass
RUN yarn run build --production

EXPOSE 3000

CMD ["yarn", "run", "start:production"]

