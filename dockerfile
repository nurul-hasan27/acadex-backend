FROM node:20-slim

# Set working directory
WORKDIR /app

# Install all dependencies (including dev)
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Expose the app port
EXPOSE 3000

# Use nodemon or default to node
CMD ["npm", "start"]
