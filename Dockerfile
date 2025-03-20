FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install production dependencies (skip dev dependencies for production)
RUN npm install --omit=dev

# Install TypeScript globally for the build step (since tsc is not found)
RUN npm install -g typescript

# Copy the rest of the application code
COPY . .

# Expose the port your application will run on
EXPOSE 9002

# Build the application using npm run build
RUN npm run build

# Start the app using npm start
CMD ["npm", "start"]
