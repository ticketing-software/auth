FROM node:alpine

ARG DB=defaultvalue

ENV DB_CONNECTION_STRING=${DB}

WORKDIR /app

COPY package.json .

# Install Production Packages only
RUN npm install --only=prod

COPY . .

CMD ["npm", "start"]
