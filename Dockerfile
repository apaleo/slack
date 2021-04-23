# Build stage
FROM node:14-alpine as builder

WORKDIR /usr/src/slack

COPY yarn.lock package*.json tsconfig*.json ./

RUN yarn install --frozen-lockfile

COPY . ./
RUN yarn build

# Production stage
FROM node:14-alpine

WORKDIR /usr/src/slack
ENV NODE_ENV=production

COPY --from=builder /usr/src/slack/node_modules ./node_modules
COPY --from=builder /usr/src/slack/dist ./dist

EXPOSE 3000
CMD ["node", "dist/app.js"]