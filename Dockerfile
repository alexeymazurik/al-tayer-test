FROM node:10.11-alpine

ADD package.json /tmp/package.json
ADD package-lock.json /tmp/package-lock.json
RUN cd /tmp && npm install
RUN mkdir /app && cp -a /tmp/node_modules /app

WORKDIR /app

COPY . /app
RUN npm run build