#Node.js parent image
FROM node:20.12.2

#Setting working directory
WORKDIR /sme/server-side/api/v1

#Copy the dependencies
COPY package*.json ./

#Install the dependencies
RUN npm install

#Copy the rest of the API
COPY . .

#The Port the API runs on
EXPOSE 2015

#The commands to start the application
CMD [ "node", "server.js" ]