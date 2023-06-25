FROM node:alpine AS development
ENV NODE_ENV development
ENV NODE_OPTIONS=--max_old_space_size=20480
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package*.json ./
RUN yarn install
# Copy app files
COPY . .
# Expose port
EXPOSE 3000
# Start the app
CMD [ "yarn", "serve-webapp" ]