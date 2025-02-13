FROM node:18-alpine3.20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY src ./src
COPY index.js ./index.js

EXPOSE 3000

CMD ["node","index.js"]