FROM node:alpine AS builder
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY src ./
COPY dist ./
COPY gulpfile.js ./ 
RUN npm i 
CMD ["/app/gulp"]
