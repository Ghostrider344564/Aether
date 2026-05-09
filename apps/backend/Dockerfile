FROM node:18-alpine

RUN apk add --no-cache python3 make g++ gcc

WORKDIR /app

COPY package.json ./
COPY apps/backend/package.json ./apps/backend/

RUN npm install

COPY . .

WORKDIR /app/apps/backend

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
