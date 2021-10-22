FROM node:14.17-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install 
ADD . . 
CMD 'npm' 'run' 'dev'