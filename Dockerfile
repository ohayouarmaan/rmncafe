FROM node:16

COPY ./ ./
RUN npm install typescript
RUN npm run build
RUN npm install

CMD [ "node", "dist/index.js" ]