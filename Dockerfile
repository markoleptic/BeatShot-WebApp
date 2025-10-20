FROM node:20.10.0-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /beatshot-app

# Install dependencies based on the preferred package manager
COPY ./package*.json ./

RUN npm install

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /beatshot-app
COPY --from=deps /beatshot-app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /beatshot-app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /beatshot-app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /beatshot-app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /beatshot-app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /beatshot-app/app/favicon.ico ./app/favicon.ico

EXPOSE 3000

# set hostname to localhost
ENV HOSTNAME="0.0.0.0"

USER nextjs

# CMD [ "pm2-runtime", "npm", "--", "start" ]
CMD ["node", "server.js"]