# Job Portal (Node.js + PostgreSQL)

A full-stack job portal where **admins post and manage job listings** and **job seekers register, log in and browse jobs**. Built with an Express.js REST API, PostgreSQL, session-based authentication and role-based access control.

## Features

- **User registration and login** with passwords hashed using **bcrypt**
- **Session-based authentication** (`express-session`)
- **Role-based access control**: separate `admin` and `user` roles enforced with middleware
- **Admin dashboard**: create and delete job postings
- **Job listings page** for logged-in users
- **REST API** backed by PostgreSQL with parameterized queries (protects against SQL injection)

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Express.js |
| Database | PostgreSQL (`pg`) |
| Auth | bcryptjs, express-session |

## API Endpoints

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/register` | Public | Register a new user (`username`, `password`, `role`) |
| POST | `/api/login` | Public | Log in and start a session |
| GET | `/api/logout` | Logged in | End the session |
| GET | `/api/jobs` | Logged in | List all jobs |
| POST | `/api/jobs` | Admin | Create a job (`title`, `company`, `description`, `location`) |
| DELETE | `/api/jobs/:id` | Admin | Delete a job |

Pages: `/` (home), `/login`, `/register`, `/user_jobs` (logged in), `/admin` (admin only).

## Project Structure

```
job_portal/
├── server.js          # Express server, routes, auth middleware
├── package.json
├── .env.example       # Environment variables template
└── public/
    ├── home.html
    ├── login.html, register.html, auth.js
    ├── user_jobs.html, user_jobs.js
    ├── admin.html, admin.js
    └── styles.css
```

## Getting Started

### 1. Prerequisites
- Node.js 18+
- PostgreSQL

### 2. Create the database

```sql
CREATE DATABASE job_portal;

\c job_portal

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'user'))
);

CREATE TABLE jobs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  company VARCHAR(200) NOT NULL,
  description TEXT,
  location VARCHAR(200)
);
```

### 3. Configure environment variables

```bash
cp .env.example .env
# then edit .env with your PostgreSQL credentials and a session secret
```

### 4. Install and run

```bash
npm install
npm start
```

Open http://localhost:3000

## Author

**Surupam Kumar Pandey** · [GitHub](https://github.com/Surupam2002) · [LinkedIn](https://www.linkedin.com/in/surupam-kumar-pandey-44b293218)
