FROM node:13.12.0-alpine

ENV PATH /app/node_modules/.bin:$PATH

COPY . /app
WORKDIR /app/fennel-app

RUN npm install
RUN npm install react-scripts@3.4.1 -g