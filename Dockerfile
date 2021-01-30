FROM node

ARG DB=defaultvalue

ENV DB_CONNECTION_STRING=${DB}

WORKDIR /app

COPY package.json .

# Install Production Packages only
RUN npm install

COPY . .

CMD ["npm", "start"]
