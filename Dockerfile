FROM node:16-alpine

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY package*.json /usr/app/
RUN npm ci --omit=dev --ignore-scripts

COPY . /usr/app/
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]