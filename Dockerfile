FROM node:14.18.1 as build 
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn build
FROM nginx:stable-alpine
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html
# CMD ["yarn", "build"]
#docker build  -f Dockerfile -t  limsplus/limsplus-portal .
