FROM node:alpine

WORKDIR /app

COPY . /app

RUN node --max-old-space-size=1024 `which npm` install --force --legacy-peer-deps

# RUN npm install --force --legacy-peer-deps

EXPOSE 3000

CMD [ "npm", "run", "start" ]
