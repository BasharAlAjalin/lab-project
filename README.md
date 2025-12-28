<p align="center">
  <img src="https://img.shields.io/badge/🔵🔴-EL_MERCADO-A50044?style=for-the-badge&labelColor=004D98" alt="El Mercado"/>
</p>

<h1 align="center">⚽ El Mercado</h1>

<p align="center">
  <strong>🔵🔴 A Blaugrana-Powered Full-Stack E-Commerce Experience 🔵🔴</strong>
</p>

<p align="center">
  <em>Built with the passion of Camp Nou, engineered with precision like a perfect tiki-taka play.</em>
</p>

<p align="center">
  <a href="https://el-mercado.netlify.app">
    <img src="https://img.shields.io/badge/Frontend-Netlify-00C7B7?style=flat-square&logo=netlify" alt="Netlify"/>
  </a>
  <a href="https://lab-project-ysqu.onrender.com">
    <img src="https://img.shields.io/badge/Backend-Render-46E3B7?style=flat-square&logo=render" alt="Render"/>
  </a>
  <img src="https://img.shields.io/badge/Database-TiDB_Cloud-4479A1?style=flat-square&logo=mysql" alt="TiDB"/>
  <img src="https://img.shields.io/badge/CI-GitHub_Actions-2088FF?style=flat-square&logo=github-actions" alt="GitHub Actions"/>
</p>

---

## 🏟️ Live Demo

| Environment         | Link                                                                   | Status  |
| ------------------- | ---------------------------------------------------------------------- | ------- |
| ⚽ **Frontend**     | [el-mercado.netlify.app](https://el-mercado.netlify.app)               | 🟢 Live |
| 🛠️ **Backend API**  | [lab-project-ysqu.onrender.com](https://lab-project-ysqu.onrender.com) | 🟢 Live |
| 💓 **Health Check** | [/health](https://lab-project-ysqu.onrender.com/health)                | ✅      |

---

## ✨ Features

<table>
<tr>
<td>

🔐 **Authentication System**

- User registration with validation
- Secure JWT-based login
- Email/account verification flow

</td>
<td>

🛍️ **E-Commerce Core**

- Product catalog management
- Category organization
- User profile (`/me`) endpoint

</td>
</tr>
<tr>
<td>

👥 **User Management**

- Role-based access control
- Protected routes
- Session handling

</td>
<td>

🚀 **Production Ready**

- TLS-secured database
- Proxy-based API routing
- Automated CI/CD pipeline

</td>
</tr>
</table>

---

## 🔧 Tech Stack

<table>
<tr>
<th>🔵 Frontend</th>
<th>🔴 Backend</th>
<th>✨ Database</th>
<th>🏆 DevOps</th>
</tr>
<tr>
<td>

- React 18
- Vite
- TailwindCSS
- Axios

</td>
<td>

- Node.js
- Express.js
- mysql2/promise
- JWT Auth

</td>
<td>

- MySQL
- TiDB Cloud (Production)
- SSL/TLS Connections

</td>
<td>

- Netlify (Frontend)
- Render (Backend)
- GitHub Actions (CI)
- Docker (Local DB)

</td>
</tr>
</table>

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         🏟️ EL MERCADO                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   ┌──────────────┐         ┌──────────────┐         ┌────────────┐ │
│   │   Frontend   │ ──API── │   Backend    │ ──SQL── │  Database  │ │
│   │   (Netlify)  │ ──────▶ │   (Render)   │ ──────▶ │  (TiDB)    │ │
│   │  React+Vite  │         │   Express    │         │   MySQL    │ │
│   └──────────────┘         └──────────────┘         └────────────┘ │
│         │                                                           │
│         │ Proxy: /api/* → Backend                                  │
│         └──────────────────────────────────────────────────────────│
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Request Flow:**

1. User visits `el-mercado.netlify.app`
2. Frontend calls `/api/*` endpoints
3. Netlify proxies requests to Render backend
4. Backend queries TiDB Cloud (MySQL) via TLS
5. Response flows back through the chain

---

## 📁 Project Structure

```
el-mercado/
├── 📂 frontend/                 # React + Vite application
│   ├── src/
│   │   ├── api/                # Axios API modules
│   │   ├── components/         # React components
│   │   └── ...
│   ├── netlify.toml            # Netlify proxy & redirects
│   ├── vite.config.js          # Vite config with dev proxy
│   └── package.json
│
├── 📂 backend/                  # Node.js + Express API
│   ├── routes/
│   │   ├── auth.js             # /api/auth/*
│   │   ├── categories.js       # /api/categories
│   │   ├── products.js         # /api/products
│   │   └── users.js            # /api/users
│   ├── scripts/
│   │   └── schema.sql          # Database schema
│   ├── .env.example            # Environment template
│   └── package.json
│
├── 📂 .github/
│   └── workflows/              # CI/CD pipelines
│
└── README.md                   # 📍 You are here
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env.example`)

```env
# 🏟️ Server Configuration
NODE_ENV=development
PORT=5001

# 🔵 MySQL Database
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_password_here
MYSQL_DATABASE=el_mercado

# 🔐 Authentication
JWT_SECRET=your_super_secret_jwt_key_here

# 🌐 CORS
CLIENT_ORIGIN=http://localhost:5173
```

### Frontend (`frontend/.env.example`)

```env
# 🔴 API Configuration
VITE_API_URL=http://localhost:5001/api
```

> ⚠️ **Note:** In production, `VITE_API_URL` should point to your deployed backend or use the Netlify proxy (`/api`).

---

## 🚀 Local Development Setup

### Prerequisites

- Node.js 18+
- MySQL 8.0+ (or Docker)
- npm or yarn

### 1️⃣ Clone & Install

```bash
# Clone the repository
git clone https://github.com/your-username/lab-project.git
cd lab-project

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2️⃣ Start the Backend

```bash
cd backend

# Copy environment template
cp .env.example .env

# Edit .env with your MySQL credentials
nano .env

# Start the server
npm run dev
```

🟢 Backend runs at `http://localhost:5001`

### 3️⃣ Start the Frontend

```bash
cd frontend

# Copy environment template (optional for local dev)
cp .env.example .env

# Start Vite dev server
npm run dev
```

🟢 Frontend runs at `http://localhost:5173`

> 💡 **Vite Proxy:** During local development, Vite automatically proxies `/api` requests to `http://localhost:5001`, so you don't need to set `VITE_API_URL` locally.

---

## 🗄️ Database Setup

### Option A: Local MySQL with Docker

```bash
# Quick MySQL container
docker run --name el-mercado-db \
  -e MYSQL_ROOT_PASSWORD=rootpassword \
  -e MYSQL_DATABASE=el_mercado \
  -p 3306:3306 \
  -d mysql:8.0

# Wait for MySQL to initialize (~30s)
sleep 30

# Import schema
docker exec -i el-mercado-db mysql -uroot -prootpassword el_mercado < backend/scripts/schema.sql
```

### Option B: Local MySQL Installation

```bash
# Connect to MySQL
mysql -u root -p

# Create database
CREATE DATABASE el_mercado;
exit;

# Import schema
mysql -u root -p el_mercado < backend/scripts/schema.sql
```

### Option C: TiDB Cloud (Production)

1. Create a free cluster at [tidbcloud.com](https://tidbcloud.com)
2. Generate a password for your cluster
3. Get connection details from the dashboard
4. Update your `.env` with TiDB credentials

> ⚠️ **TLS Required:** TiDB Cloud requires secure connections. The backend uses `mysql2` with SSL enabled:
>
> ```javascript
> ssl: {
>   rejectUnauthorized: true;
> }
> ```
>
> This resolves the `"Connections using insecure transport are prohibited"` error.

---

## 🌍 Deployment Guide

### 🔴 Deploy Backend to Render

1. **Create a new Web Service** on [render.com](https://render.com)

2. **Configure Build Settings:**
   | Setting | Value |
   |---------|-------|
   | Root Directory | `backend` |
   | Build Command | `npm install` |
   | Start Command | `npm start` |

3. **Add Environment Variables:**

   ```
   NODE_ENV=production
   PORT=10000
   MYSQL_HOST=your-tidb-host.tidbcloud.com
   MYSQL_PORT=4000
   MYSQL_USER=your_user
   MYSQL_PASSWORD=your_password
   MYSQL_DATABASE=el_mercado
   JWT_SECRET=your_production_secret
   CLIENT_ORIGIN=https://el-mercado.netlify.app
   ```

4. **Deploy!** 🚀

### ✨ Deploy Database with TiDB Cloud

1. Sign up at [tidbcloud.com](https://tidbcloud.com)
2. Create a **Serverless** cluster (free tier available)
3. Click **Connect** → Generate password
4. Copy the connection details to your Render env vars
5. Import schema via TiDB Cloud console or CLI

### 🔵 Deploy Frontend to Netlify

1. **Connect your GitHub repo** on [netlify.com](https://netlify.com)

2. **Configure Build Settings:**
   | Setting | Value |
   |---------|-------|
   | Base Directory | `frontend` |
   | Build Command | `npm run build` |
   | Publish Directory | `frontend/dist` |

3. **Add Environment Variable:**

   ```
   VITE_API_URL=/api
   ```

4. **Create `frontend/netlify.toml`:**

   ```toml
   [[redirects]]
     from = "/api/*"
     to = "https://lab-project-ysqu.onrender.com/api/:splat"
     status = 200
     force = true

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

5. **Deploy!** 🎉

---

## 🔄 CI/CD Pipeline

### What Runs on PR/Push

| Workflow        | Trigger                | Actions           |
| --------------- | ---------------------- | ----------------- |
| **Frontend CI** | `push`, `pull_request` | Lint → Build      |
| **Backend CI**  | `push`, `pull_request` | Lint → Jest Tests |

### Run Tests Locally

```bash
# Backend tests
cd backend
npm test

# Run with coverage
npm run test:coverage
```

> 💡 Create `backend/.env.test` for test-specific database credentials if needed.

---

## 🧪 API Quick Test

### Health Check

```bash
curl https://lab-project-ysqu.onrender.com/health
# {"status":"ok","timestamp":"..."}
```

### Register a User

```bash
curl -X POST https://lab-project-ysqu.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"fan@barca.com","password":"Visca123!","name":"Culer"}'
```

### Login

```bash
curl -X POST https://lab-project-ysqu.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"fan@barca.com","password":"Visca123!"}'
```

### Verify Account

```bash
curl -X POST https://lab-project-ysqu.onrender.com/api/auth/verify \
  -H "Content-Type: application/json" \
  -d '{"token":"your_verification_token"}'
```

### Get Categories

```bash
curl https://lab-project-ysqu.onrender.com/api/categories
```

### Get Products

```bash
curl https://lab-project-ysqu.onrender.com/api/products
```

---

## 🔧 Troubleshooting

<details>
<summary><strong>🔴 404 on `/api/auth/register` in production</strong></summary>

**Cause:** Frontend calling wrong URL or Netlify proxy not configured.

**Fix:**

1. Ensure `VITE_API_URL=/api` is set in Netlify env vars
2. Verify `netlify.toml` redirects are in place
3. Redeploy frontend after adding the config

</details>

<details>
<summary><strong>🔴 MySQL "Access Denied" in tests</strong></summary>

**Cause:** Tests using wrong credentials or port.

**Fix:**

1. Create `backend/.env.test` with test database credentials
2. Ensure test database exists
3. Check port matches your MySQL instance (3306 default, 4000 for TiDB)

</details>

<details>
<summary><strong>🔴 TiDB "Connections using insecure transport are prohibited"</strong></summary>

**Cause:** TiDB Cloud requires TLS/SSL connections.

**Fix:** Enable SSL in your mysql2 connection config:

```javascript
const pool = mysql.createPool({
  // ... other config
  ssl: {
    rejectUnauthorized: true,
  },
});
```

</details>

<details>
<summary><strong>🔴 React lint warnings (memo deps / react-refresh)</strong></summary>

**Cause:** ESLint rules for hooks dependencies or component exports.

**Fix:**

1. **Missing deps:** Add all dependencies to the array or disable rule with comment
2. **react-refresh only-export-components:** Move helper functions to separate files, keep only components in component files

</details>

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/amazing-feature`)
3. 💾 Commit your changes (`git commit -m 'Add amazing feature'`)
4. 📤 Push to the branch (`git push origin feature/amazing-feature`)
5. 🔃 Open a Pull Request

Please ensure your code passes all CI checks before requesting review.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

> 📚 _Educational project for learning full-stack development._

---

## 👥 Team

<table>
<tr>
<td align="center">
<strong>Bashar Al-Ajalin</strong><br/>
🔵 Developer
</td>
<td align="center">
<strong>Aziz Abu Qwiader</strong><br/>
🔴 Developer
</td>
</tr>
</table>

---

<p align="center">
  <strong>🔵🔴 Més que un projecte 🔵🔴</strong>
</p>

<p align="center">
  <em>Built with ❤️ and the spirit of beautiful code.</em>
</p>

<p align="center">
  ⭐ Star this repo if you found it helpful!
</p>
