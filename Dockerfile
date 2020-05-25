FROM node:lts-slim
RUN apt-get update -y
RUN apt-get install git -y
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN find . -maxdepth 1 ! -name 'dist' -exec rm -rf {} ';'

FROM node:lts-alpine  
WORKDIR /app
COPY --from=0 /app .
CMD npx http-server dist
