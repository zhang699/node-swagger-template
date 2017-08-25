FROM node:7.6
EXPOSE 10011
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .
CMD [ "npm", "run", "start_from_docker" ]

