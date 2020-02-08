FROM node:10.13.0-alpine
WORKDIR /my_app

ENV NODE_ENV=production

RUN apk add yarn

COPY package.json ./

RUN yarn --prod --silent

COPY ./ /my_app/

EXPOSE 5000

CMD ["yarn", "run", "start:production"]

