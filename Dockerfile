FROM node:18-alpine3.20

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install pm2 -g

COPY src ./src
COPY index.js ./index.js

EXPOSE 3000

# Run the app using PM2 and ensure PM2 stays in daemon mode
CMD ["pm2-runtime", "start", "index.js", "--name", "url-shortener", "--watch"]