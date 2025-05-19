# Acadex Backend

This repository provides the backend service for the Acadex platform. The application is containerized with Docker and can be easily pulled and run using the instructions below.

---

## 🐳 Pull the Docker Image from Docker Hub

Run the following command in your terminal:

```bash
docker pull hasan27/acadex-backend
```

## run the backend container, use the following command:

```bash
docker run -d -p 3000:3000 -v $(pwd):/app --name acadex-backend hasan27/acadex-backend:0.0.1.RELEASE
```

