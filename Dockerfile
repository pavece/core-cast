FROM node:22-bullseye AS base-full
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM node:22-alpine AS base-alpine
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base-full AS build
COPY . /app
WORKDIR /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build
RUN pnpm deploy --filter=upload-service --prod /prod/upload-service
RUN pnpm deploy --filter=transcoding-service --prod /prod/transcoding-service
RUN pnpm deploy --filter=core-service --prod /prod/core-service
RUN pnpm deploy --filter=housekeeping-service --prod /prod/housekeeping-service
RUN pnpm deploy --filter=frontend --prod /prod/frontend

RUN cp -r /app/frontend/.next /prod/frontend/.next
RUN if [ -d "/app/frontend/public" ]; then cp -r /app/frontend/public /prod/frontend/public; fi
RUN if [ -f "/app/frontend/next.config.js" ]; then cp /app/frontend/next.config.js /prod/frontend/; fi
RUN if [ -f "/app/frontend/next.config.mjs" ]; then cp /app/frontend/next.config.mjs /prod/frontend/; fi
RUN if [ -f "/app/frontend/next.config.ts" ]; then cp /app/frontend/next.config.ts /prod/frontend/; fi

FROM base-alpine AS upload-service
COPY --from=build /prod/upload-service /upload-service
WORKDIR /upload-service
ENV PORT=8080
ENV PROMETHEUS_SERVER_PORT=8081
EXPOSE 8080 8081
CMD ["pnpm", "start"]

FROM base-full AS transcoding-service
RUN apt-get update && apt-get install -y ffmpeg
COPY --from=build /prod/transcoding-service /transcoding-service
WORKDIR /transcoding-service
ENV PROMETHEUS_SERVER_PORT=8081
EXPOSE 8081
CMD ["pnpm", "start"]

FROM base-alpine AS core-service
COPY --from=build /prod/core-service /core-service
WORKDIR /core-service
ENV PORT=8080
ENV PROMETHEUS_SERVER_PORT=8081
EXPOSE 8080 8081
CMD ["pnpm", "start"]

FROM base-alpine AS housekeeping-service
COPY --from=build /prod/housekeeping-service /housekeeping-service
WORKDIR /housekeeping-service
ENV PROMETHEUS_SERVER_PORT=8081
EXPOSE 8081
CMD ["pnpm", "start"]

FROM base-alpine AS frontend
COPY --from=build /prod/frontend /frontend
WORKDIR /frontend
ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_BASE_URL="/api"
ENV SERVER_SIDE_API="http://traefik:80/api"
ENV PORT=3000
EXPOSE 3000
CMD ["pnpm", "start"]