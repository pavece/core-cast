![Header Image](http://static.pavece.com/public-files/corecast/readme-header.png)

# Core Cast

Core Cast is a video sharing platform with a custom video upload and processing pipeline, an embedding-based recommendation system, and full-text search, built using a microservices architecture.

> [!WARNING]
> Core Cast is a learning project. It lacks many features and is a relatively complex system composed of multiple services. While basic documentation for self-hosting will be provided, it is not intended for easy or full self-hosting.


## Features

- Custom video processing pipeline
- Resumable, chunked video uploads
- Embedding-based recommendation system & full-text search
- Performant, measurable video interactions and view tracking
- Gated multi-role account system with OTP 2FA support
- Prometheus metrics & basic Grafana dashboard

## Demo and public site

## Basic system and services setup

## Self hosting

## Considerations

You can use [Minio](https://www.min.io/) or [S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) as object storage solution. SS3 is recommended for production environments.

Remember to make the CDN bucket files publicly accessible but without allowing directory listing.