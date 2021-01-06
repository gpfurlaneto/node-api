FROM node:lts-buster

WORKDIR /app

COPY . ./

RUN npm install

RUN npm run build

EXPOSE 4000

RUN npm install -g pm2

CMD ["pm2-docker", "pm2.config.js"]