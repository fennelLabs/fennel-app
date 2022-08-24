FROM ubuntu:latest

RUN DEBIAN_FRONTEND=noninteractive \
    apt-get update -y && \
    ln -fs /usr/share/zoneinfo/America/New_York /etc/localtime && \
    apt-get install -y tzdata && \
    dpkg-reconfigure --frontend noninteractive tzdata && \
    apt-get install unzip curl python3 python3-pip -y && \
    apt-get upgrade -y
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install nodejs -y

ENV PATH /app/node_modules/.bin:$PATH

COPY . /app
WORKDIR /app/fennel-app

RUN npm install
RUN npm install react-scripts@3.4.1 -g