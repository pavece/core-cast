group "default" {
  targets = [
    "upload-service",
    "transcoding-service",
    "core-service",
    "housekeeping-service",
    "frontend",
    "prisma-migrate"
  ]
}

target "upload-service" {
  context = "."
  dockerfile = "Dockerfile"
  target = "upload-service"
  tags = ["REPO/pavece/cc-upload-service:latest"]
  output = ["type=image,push=true,provenance=false"]
}

target "transcoding-service" {
  context = "."
  dockerfile = "Dockerfile"
  target = "transcoding-service"
  tags = ["REPO/pavece/cc-transcoding-service:latest"]
  output = ["type=image,push=true,provenance=false"]
}

target "core-service" {
  context = "."
  dockerfile = "Dockerfile"
  target = "core-service"
  tags = ["REPO/pavece/cc-core-service:latest"]
  output = ["type=image,push=true,provenance=false"]
}

target "housekeeping-service" {
  context = "."
  dockerfile = "Dockerfile"
  target = "housekeeping-service"
  tags = ["REPO/pavece/cc-housekeeping-service:latest"]
  output = ["type=image,push=true,provenance=false"]
}

target "frontend" {
  context = "."
  dockerfile = "Dockerfile"
  target = "frontend"
  tags = ["REPO/pavece/cc-frontend:latest"]
  output = ["type=image,push=true,provenance=false"]
}

target "prisma-migrate" {
  context = "."
  dockerfile = "Dockerfile.migrate"
  tags = ["REPO/pavece/cc-prisma-migrate:latest"]
  output = ["type=image,push=true,provenance=false"]
}
