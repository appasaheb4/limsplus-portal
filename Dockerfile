FROM node:latest
RUN mkdir -p /usr/src/web
WORKDIR /usr/src/web
# COPY package*.json ./
# COPY yarn.lock ./
# RUN yarn install
COPY build /usr/src/web/build
RUN yarn global add serve
# Expose port
EXPOSE 3000
# Start the app
# CMD [ "yarn", "serve-webapp" ]
CMD serve -s build