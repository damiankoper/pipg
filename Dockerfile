FROM node:lts-slim
RUN apt-get update -y
RUN apt-get install git -y
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD npx http-server dist