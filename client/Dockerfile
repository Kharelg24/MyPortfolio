FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Expose port 3000 to allow external access to the app
EXPOSE 3000

# Start the application
CMD ["npm", "start"]





