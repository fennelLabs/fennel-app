#!/bin/bash
curl -sL https://deb.nodesource.com/setup_14.x | bash -
apt update
apt upgrade -y
apt install -y nodejs
apt autoremove -y