FROM node:latest

ENV DOMAIN_NAME=example.com
ENV ADMIN_PASSWORD=admin
ENV ADMIN_EMAIL=admin@example.com

RUN mkdir -p /usr/web

COPY . /usr/web

WORKDIR /usr/web/app

RUN npm install && \
    npm run build

WORKDIR /usr/web/server

RUN npm install && \
    mkdir /opt/cert && \
    openssl req -x509 -nodes -days 365 -subj "/CN=${DOMAIN_NAME}" -newkey rsa:2048 -keyout /opt/cert/analog-server.key -out /opt/cert/analog-server.crt
