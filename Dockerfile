FROM node:latest

RUN mkdir -p /home/node/app/ripley-frontend/dev && mkdir -p /home/node/app/ripley-backend/node_modules && mkdir -p /home/node/app/ripley-frontend/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app
 
ENV MONGO_URL "mongodb://mongo:27017"
ENV DB_NAME points
ENV COL_NAME dataPoints





RUN npm install -g @angular/cli
RUN npm i -g @nestjs/cli 
USER node

COPY --chown=node:node . .

WORKDIR /home/node/app/ripley-frontend




RUN npm install

RUN ng build 
 

WORKDIR /home/node/app/ripley-backend
 
RUN npm install


CMD ["npm", "run", "start"]