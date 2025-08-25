![Header Image](http://static.pavece.com/public-files/corecast/readme-header.png)

# Core Cast

Video-sharing platform built on a microservices architecture. Features a custom video processing pipeline, embedding-based recommendations, full-text search and bath analytics.

> [!WARNING]
> Core Cast is a learning project. It lacks many features and is a relatively complex system composed of multiple services. While basic documentation for self-hosting will be provided, it is not intended for easy or full self-hosting.

---

## Features

- Custom video processing pipeline
- Resumable, chunked video uploads
- Embedding-based recommendation system and full-text search
- Measurable video interactions and view tracking
- Multi-role account system with OTP 2FA
- Prometheus metrics with a basic Grafana dashboard

## Demo

A customized version is deployed here: [https://videos.pavece.com](https://videos.pavece.com).  
The frontend UI is modified to match my blog, but the backend remains the same.

[Watch the demo video here]()

## System architecture overview
![System diagram](https://static.pavece.com/public-files/corecast/basic-diagram.png)

This is a general overview of the system components. While not every service uses every database, they are shown together here for simplicity. (Some components are not present in the diagram)

---

## Running Core Cast

A Docker Compose setup (`compose.prod.yml`) is included for demo/testing. This setup is **not production-optimized**. Use only for experimentation.

### 1. Clone the repository

```bash
git clone https://github.com/pavece/core-cast.git
```

### 2. Build Docker images

```bash
docker compose -f compose.prod.yml build
```

### 3. Start the services

```bash
docker compose -f compose.prod.yml up -d
```

## Production Notes

Environment variables are configured via `.env.docker` (defaults provided for testing). **Do not use defaults in production**—replace with secure credentials. By default, extra services are exposed to simplify testing.

If deploying with the provided Compose file (**not recommended**) please remember to only expose the traefik proxy service and object store API, nothing else.

## Object Storage considerations

You can use [Minio](https://www.min.io/) or [S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) as object storage solution. S3 is recommended for production environments.

Remember to make the CDN bucket files publicly accessible but without allowing directory listing.
