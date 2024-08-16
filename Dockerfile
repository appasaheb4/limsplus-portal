FROM node:latest
RUN mkdir /app
WORKDIR /app
COPY . /app
RUN yarn install
# RUN yarn build
RUN yarn global add serve
EXPOSE 3000
CMD ["yarn","start"]

