FROM node:20-alpine


WORKDIR /app 

COPY package.json yarn.lock ./

COPY . .

RUN yarn install 

EXPOSE 3000

CMD [ "yarn" , "start" ]