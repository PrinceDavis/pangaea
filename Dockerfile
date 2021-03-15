FROM node:14.8.0
WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 5000
CMD ["/bin/sh", "entrypoint.sh"]