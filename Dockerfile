FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install production dependencies (skip dev dependencies for production)
RUN npm install --omit=dev

# Copy the rest of the application code
COPY . .

# Expose the port
EXPOSE 9002

# Build the application using npm run build (ensure the script exists)
RUN npm run build

# Start the app using npm start
CMD ["npm", "start"]
