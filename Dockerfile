FROM node:23-alpine

# Work directory of the container
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

# Copy all project into the container
COPY . .

# Build production
RUN npm run build

# Expose :8080 port
EXPOSE 8080

# Set command to run the production server
CMD ["npm", "run", "start", "--", "-p", "8080"]
