# SkillSwap – Share Skills, Build Connections

## Live
- **Frontend**: https://skill-swap-connect.netlify.app
- **Backend**: https://skillswap-backend-i968.onrender.com (health check: `/api/status`)

## Tagline
**Learn Anything. Teach Everything.**

## Project Overview
SkillSwap is a platform designed to connect individuals based on their skills and learning goals. Instead of paying for courses, users exchange knowledge: for example, you teach Java, and in return, someone teaches you Guitar.

### Main Features
- **Smart Matching Engine**: Calculates compatibility scores and suggests direct matches (e.g. User A wants to learn what User B teaches, and User B wants to learn what User A teaches).
- **Skill Categories**: Support for Technology, Music, Arts, Dance, Cooking, Languages, Photography, Editing, Sports, and Fitness.
- **Request Workflow**: Send exchange requests, accept/reject, and schedule teaching/learning sessions.
- **Reviews & Ratings**: Rate members after successful sessions to build trust.

## Technology Stack
- **Backend**: Spring Boot, Java, Spring Data JPA, Hibernate, Spring Security, JWT, Gradle, PostgreSQL (H2 for local dev).
- **Frontend**: React + Vite, Vanilla CSS.

## Directory Structure
- `frontend/`: React frontend containing component designs, starting with a glassmorphic login page.
- `backend/`: Spring Boot REST API for user authentication, matching engine, and profile management.

## Local Development
- Backend: `cd backend && ./gradlew bootRun` (runs on H2 in-memory DB, port 8080).
- Frontend: `cd frontend && npm install && npm run dev` (port 5173). Copy `.env.example` to `.env` to point at a non-default backend URL.

## Deployment
- **Database**: Neon.tech (free-tier Postgres).
- **Backend**: Render (free web service, deployed via `backend/Dockerfile` / `render.yaml`).
- **Frontend**: Netlify (free tier, config in `netlify.toml`).

See the backend's `application-prod.properties` for the environment variables required in production (`DATABASE_URL`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`, `JWT_SECRET`, `CORS_ALLOWED_ORIGINS`).
