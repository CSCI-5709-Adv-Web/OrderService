FROM node:18-alpine

WORKDIR /app

# Copy only package.json and package-lock.json
COPY package*.json ./

# Install production dependencies only
RUN npm ci

# Copy the compiled files from the build stage
COPY --from=build /app/dist ./dist

# Expose the port your application will run on
EXPOSE 9002

# Start the app using the compiled entry point
CMD ["node", "dist/index.js"]