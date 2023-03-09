# Dependencies
FROM node:alpine AS dependencies
WORKDIR /frontend
COPY package.json .
RUN yarn

# Running
FROM dependencies AS run
COPY . .
CMD [ "yarn", "dev" ]
