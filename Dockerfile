FROM node:latest
RUN mkdir -p /usr/src/web
WORKDIR /usr/src/web
COPY package*.json /usr/src/web
RUN yarn install
COPY . /usr/src/web
# Expose port
EXPOSE 3000
# Start the app
CMD [ "yarn", "serve-webapp" ]