# 1. Use Node 22 (LTS) to satisfy Vite's requirements
FROM node:22-alpine AS builder

# 2. Install build tools (fixes the "native binding" / tailwind oxide error)
RUN apk add --no-cache libc6-compat

WORKDIR /app

# 3. Install pnpm
RUN npm install -g pnpm

# 4. Copy package files
COPY package.json pnpm-lock.yaml ./

# 5. Install dependencies
RUN pnpm install --frozen-lockfile

# 6. Copy source code
COPY . .

# 7. Build the application
RUN pnpm run build

# Production stage
FROM nginx:alpine

# 8. Copy built files (Ensure your output folder is 'dist')
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]