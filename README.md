# 🚀 Acadex Backend

This repository provides the **backend service** for the **Acadex** platform. The application is fully **containerized using Docker 🐳** and can be pulled and run with ease by following the instructions below.

---

## ⚙️ Backend Setup Guide

### ✅ 1. Prerequisites

Make sure you have the following installed:

- 🐳 **Docker** → [Install Docker](https://docs.docker.com/)
  - Check installation:
    ```bash
    docker --version
    ```

- 📦 **Docker Hub Account** → [Sign in / Sign up](https://hub.docker.com/)

- 🧰 **Git** → [Install Git](https://git-scm.com/)
  - (Optional: Watch a YT setup video 🎥)
  - Verify Git:
    ```bash
    git
    ```

- 🌐 **GitHub Account** → [Sign in / Sign up](https://github.com/)
  - Familiarize yourself with:
    1. 🍴 Forking a repository  
    2. 📥 Cloning a repository  
    3. 📝 Making commits  
    4. 📤 Pushing changes  
    5. 🔁 Pull Requests (PRs)

- 🖊️ **Code Editor** → VS Code (*recommended*) 🧑‍💻

---

### 📂 2. Clone the GitHub Repository

Navigate to your desired working directory and run:

```bash
git clone https://github.com/nurul-hasan27/acadex-backend
```

---

### 📝 3. Prepare Environment Variables

Create a `.env` file in the **root directory** and copy the contents of `.env-sample` into it.

---

### 📦 4. Pull the Docker Image from Docker Hub

Run the following command in your terminal:

```bash
docker pull hasan27/acadex-backend
```

---

### ▶️ 5. Run the Docker Container

Start the backend server by running:

```bash
docker run -d -p 3000:3000 -v $(pwd):/app --name acadex-backend hasan27/acadex-backend:0.0.1.RELEASE
```

---

### 🌐 6. Test if the Backend is Running

Open your browser and visit:

```bash
http://localhost:3000/
```

You should see the backend running 🎉

---

### 📄 7. Check Container Logs (if needed)

Open Docker Desktop GUI and click on `acadex-backend` container → check the logs 🧾

---

### 🔁 8. Stop / Restart the Container

Use the following commands when required:

- 🛑 Stop:
  ```bash
  docker stop acadex-backend
  ```

- 🔁 Restart:
  ```bash
  docker start acadex-backend
  ```

---

### *Made with ❤️ by team backend (Acadex)*
