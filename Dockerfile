# Node Basis Image.
FROM node:18.14.2

# Setting Working Directory.
WORKDIR /app

# Copying the package.json and package-lock.json into the working directory.
COPY package*.json ./

# Install all packages.
RUN npm install

# Copy the rest of the code into the working directory.
COPY . .

# Buidling the NextJS application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD [ "npm", "start" ]