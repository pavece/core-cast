FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /app
WORKDIR /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build
RUN pnpm deploy --filter=upload-service --prod /prod/upload-service
RUN pnpm deploy --filter=transcoding-service --prod /prod/transcoding-service
RUN pnpm deploy --filter=core-service --prod /prod/core-service
RUN pnpm deploy --filter=housekeeping-service --prod /prod/housekeeping-service

# Upload service image
FROM base AS upload-service
COPY --from=build /prod/upload-service /upload-service
WORKDIR /upload-service
ENV PORT=8080
ENV PROMETHEUS_SERVER_PORT=8081
EXPOSE 8080
EXPOSE 8081
CMD [ "pnpm", "start" ]

# Transcoding service image
FROM base AS transcoding-service
COPY --from=build /prod/transcoding-service /transcoding-service
WORKDIR /transcoding-service
ENV PROMETHEUS_SERVER_PORT=8081
EXPOSE 8081
CMD [ "pnpm", "start" ]

# Core service image
FROM base AS core-service
COPY --from=build /prod/core-service /core-service
WORKDIR /core-service
ENV PORT=8080
ENV PROMETHEUS_SERVER_PORT=8081
EXPOSE 8080
EXPOSE 8081
CMD [ "pnpm", "start" ]

# Housekeeping service image
FROM base AS housekeeping-service
COPY --from=build /prod/housekeeping-service /housekeeping-service
WORKDIR /housekeeping-service
ENV PROMETHEUS_SERVER_PORT=8081
EXPOSE 8081
CMD [ "pnpm", "start" ]

