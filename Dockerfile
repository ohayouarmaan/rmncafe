FROM node:16

EXPOSE 4000
COPY ./dist/ ./
COPY package.json ./
RUN npm install

CMD [ "node", "index.js" ]