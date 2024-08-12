FROM node:latest
RUN mkdir /app
WORKDIR /app
COPY . /app
# RUN export NODE_OPTIONS=--max_old_space_size=15000
# RUN yarn install
# RUN yarn build
# COPY build /app/build
RUN yarn global add serve
# Expose port
EXPOSE 3000
# CMD serve -s build
CMD ["yarn","start"]