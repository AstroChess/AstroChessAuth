FROM node:18.16-alpine
WORKDIR /app
COPY ./* ./
RUN npm install
RUN npx tsc index.ts
CMD ["node", "./index.js"]
