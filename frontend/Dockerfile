# Step 1: Use an official Node image as a parent image
FROM node:16.20.2

# Step 2: Set the working directory inside the container
WORKDIR /app

# Define build-time variables
ARG VUE_APP_BACKEND_URL

# Set the environment variable
ENV VUE_APP_BACKEND_URL=${VUE_APP_BACKEND_URL}

# Step 3: Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of your app's source code
COPY . .

# Step 6: Build the app for production
RUN npm run build

# Step 7: Install a simple server to serve static content
RUN npm install -g http-server

# Step 8: Expose the port the app runs on
EXPOSE 8080

# Step 9: Run the app
CMD [ "http-server", "dist" ]
