# Reddit-Inspired Community Platform

A production-oriented, Reddit-inspired social discussion platform built with **Bun, TypeScript, Express, PostgreSQL, Drizzle ORM, Redis, and Docker**.

The project is designed around a **microservices architecture**, with independently deployable services for authentication, posts, comments, communities, notifications, and API routing.

### Architecture

* **Bun + TypeScript** for the runtime and development environment
* **Express** for HTTP APIs
* **PostgreSQL + Drizzle ORM** for persistent data
* **Redis Pub/Sub** for asynchronous communication between services
* **Pino** for structured application logging
* **Docker** for containerized development and deployment
* **Kubernetes + AWS** planned for production deployment

### Services

* API Gateway
* Authentication Service
* Post Service
* Comment Service
* Community Service
* Notification Service

The system follows clear service boundaries, repository/service/controller separation, shared event contracts, structured logging, environment-based configuration, and asynchronous event-driven communication.

The goal is to build a realistic backend system that demonstrates **scalable architecture, distributed systems concepts, API design, database modeling, event-driven communication, security, observability, containerization, and production engineering practices**.
