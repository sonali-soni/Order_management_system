# Use an official Node runtime as a parent image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the project dependencies with additional logging and ignoring peer dependency conflicts
RUN npm install 

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Install serve to serve the build application
RUN npm install -g serve

# Set the environment variable
ENV NODE_ENV=production

# Expose the port that the application will run on
EXPOSE 3000

# Command to run the application
CMD ["serve", "-s", "build", "-l", "3000"]
