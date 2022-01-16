FROM node:alpine


RUN echo "NODE Version:" && node --version
RUN echo "NPM Version:" && npm --version


WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm i gulp 
COPY . .

EXPOSE 8000
CMD [ "./node_modules/.bin/gulp" ]

