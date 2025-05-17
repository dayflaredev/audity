# Stage 1: Install dependencies
FROM node:18 AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# Stage 2: Build the app
FROM node:18 AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build
RUN ls -al dist

# Stage 3: Final image
FROM node:18 AS final
WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/dist ./dist
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY package.json ./

EXPOSE 3000

# Run migration and start app in a single shell command safely
CMD ["sh", "-c", "npx prisma db push && node dist/src/main"]
