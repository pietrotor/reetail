FROM node:22.11-alpine as build

# Environment variables for optimization
ENV NODE_ENV=production
ENV GENERATE_SOURCEMAP=false

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm ci && npm cache clean --force

# Copy source code
COPY . .

# Build the application and verify the build was created
RUN npm run build && ls -la /app/

# Production stage with nginx
FROM nginx:alpine

# Copy built files from previous stage
COPY --from=build /app/dist* /usr/share/nginx/html/

# Copy custom nginx configuration (optional)
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Default command
CMD ["nginx", "-g", "daemon off;"]
