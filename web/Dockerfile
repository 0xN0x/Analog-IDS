FROM node:latest

RUN mkdir -p /usr/web
COPY . /usr/web
WORKDIR /usr/web/app
RUN npm install
RUN npm run build
WORKDIR /usr/web/server
RUN npm install
RUN npm start