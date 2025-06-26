# Upload Service

Microservice for handling multipart video uploads.

This is a standalone service, it provides an API for clients to perform resumable chunked uploads.
It recieves chunks, verifies their integrity, joins them and reuploads them to a object store like S3 or minio.
