FROM node:16.13.1-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock .yarn ./

# Install app dependencies
RUN yarn

# Bundle app source
COPY . .

# EXPOSE 4000
CMD [ "yarn", "start" ]