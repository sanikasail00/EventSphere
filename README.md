# EventSphere

EventSphere is a containerized campus event registration platform developed to demonstrate structured deployment using Docker and Nginx reverse proxy. The project focuses on deployment quality, networking, security, and proper documentation rather than feature complexity.

---

## 1. Project Description

EventSphere provides a centralized platform where:

- Students can view available events
- Students can register for events
- Admins can manage event details

The application follows a full-stack architecture with a containerized backend and Nginx reverse proxy for structured routing.

---

## 2. System Architecture

Client (Browser)
        |
        v
Nginx Reverse Proxy (Port 80)
        |
        v
Backend Server (Node.js - Port 5000)
        |
        v
JSON Data Storage

The backend runs inside a Docker container. Nginx handles request routing and serves frontend content.

---

## 3. Technologies Used

Frontend:
- HTML
- CSS
- JavaScript

Backend:
- Node.js
- Express.js

Deployment:
- Docker
- Nginx

---

## 4. Docker Implementation

The backend application is containerized using Docker to ensure:

- Environment consistency
- Portability
- Restart safety
- Structured deployment

### Build Docker Image

docker build -t eventsphere-backend .

### Run Docker Container

docker run -d -p 5000:5000 --name eventsphere --restart unless-stopped eventsphere-backend

### Verify Running Containers

docker ps

### View Logs

docker logs eventsphere

---

## 5. Nginx Reverse Proxy Configuration

Nginx is used to:

- Serve frontend static files
- Forward API requests to backend container

Routing Logic:

- "/" serves frontend files
- "/api/" forwards requests to backend (localhost:5000)

Example Configuration:

server {
    listen 80;

    location / {
        root /var/www/html;
        index index.html;
    }

    location /api/ {
        proxy_pass http://localhost:5000/;
    }
}

---

## 6. Port Mapping Documentation

| Service   | Internal Port | Exposed Port |
|-----------|--------------|--------------|
| Backend   | 5000         | 5000         |
| Nginx     | 80           | 80           |

Only necessary ports are exposed. Backend access is controlled through Nginx routing.

---

## 7. Networking and Security

- Only port 80 is publicly accessible.
- Backend port 5000 is not directly exposed to external users.
- Reverse proxy architecture reduces attack surface.
- Unused ports are restricted.

---

## 8. Testing the Application

Test backend API:

curl http://localhost/api/events

Check running containers:

docker ps

---

## 9. Serverful vs Serverless (Conceptual Comparison)

Serverful Deployment:
- Backend runs continuously inside a Docker container.
- Requires server resource allocation.

Serverless Deployment:
- Backend functions run only when triggered.
- Example: AWS Lambda.
- No continuous server maintenance.

This project follows a serverful deployment model.

---

## 10. Future Improvements

- Replace JSON storage with a database (MongoDB/MySQL)
- Implement authentication and authorization
- Deploy on cloud infrastructure
- Add HTTPS with SSL certificates
- Implement CI/CD pipeline

---

## 11. Repository Structure

eventsphere/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
│
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── script.js
│
├── nginx/
│   └── nginx.conf
│
└── README.md

---

## Author

Sanika