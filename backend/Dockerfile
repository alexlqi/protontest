# Use the official Node.js 14 image as a parent image
FROM node:16.20.2

# Set the working directory in the container to /usr/src/app
WORKDIR /usr/src/app

# Define build-time variables
ARG INIT_DB
ARG MONGODB_DSN

# Set the environment variable
ENV INIT_DB=${INIT_DB}
ENV MONGODB_DSN=${MONGODB_DSN}

# Copy package.json and package-lock.json (if available) into the container
COPY package*.json ./

# Install any dependencies
RUN npm install

# If you're building your code for production
# RUN npm ci --only=production

# Bundle the source code inside the Docker image
COPY . .

# Map port 3000 to the outside world
EXPOSE 3000

# Define the command to run the app
CMD [ "node", "server.js" ]
