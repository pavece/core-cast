FROM node:22-alpine AS base
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

# Upload service image
FROM base AS upload-service
COPY --from=build /prod/upload-service /upload-service
WORKDIR /upload-service
ENV PORT=8080
EXPOSE 8080
CMD [ "pnpm", "start" ]

# Transcoding service image
FROM base AS transcoding-service
COPY --from=build /prod/transcoding-service /transcoding-service
WORKDIR /transcoding-service
ENV PORT=8080
EXPOSE 8080
CMD [ "pnpm", "start" ]
