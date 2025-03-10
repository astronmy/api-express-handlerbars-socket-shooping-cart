FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --only=production

COPY . .

EXPOSE 3000

CMD ["node", "src/app.js"]
