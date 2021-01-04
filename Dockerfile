FROM node:alpine

WORKDIR /app

COPY package.json .

# Install Production Packages only
RUN npm install --only=prod

COPY . .

CMD ["npm", "start"]
