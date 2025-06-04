FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Expose port 4000 to allow external access to the app
EXPOSE 4000

# Start the application
CMD ["node", "aboutMe.js"]


