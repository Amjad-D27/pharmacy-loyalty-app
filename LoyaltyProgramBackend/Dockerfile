
FROM node:20.15.1-slim

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8080

CMD ["npm", "run", "start"]
