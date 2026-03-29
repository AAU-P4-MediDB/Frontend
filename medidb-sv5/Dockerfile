FROM node:20-alpine

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy manifests first for better layer caching
COPY package.json pnpm-lock.yaml ./

RUN pnpm install

# Copy the rest of the source
COPY . .

EXPOSE 5173

CMD ["pnpm", "run", "dev", "--host"]
