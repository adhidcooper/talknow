# Use the official Bun image as the base
FROM oven/bun:1 AS base

# Set the working directory
WORKDIR /app

# Copy package files
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install

# Copy the rest of the application files
COPY . .

# Expose the port your application will run on
EXPOSE 5000

# Start the application
CMD ["bun", "run", "dev", "--host", "0.0.0.0"]

