# ConvexDB

A modern, full-stack task management ecosystem demonstrating real-time data synchronization across a React frontend, a serverless Convex backend, and a Bun-powered Express API.

[![Convex](https://img.shields.io/badge/Backend-Convex-ff69b4)](https://convex.dev)
[![React](https://img.shields.io/badge/Frontend-React_19-blue)](https://react.dev)
[![Runtime](https://img.shields.io/badge/Runtime-Bun-black)](https://bun.sh)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

## 📖 Overview

ConvexDB is a reference implementation of a multi-layered application architecture. It showcases how to maintain a single source of truth using **Convex** while interacting with that data through two distinct paths:
1.  **Direct Client-to-Cloud**: A React application using reactive hooks for instant UI updates.
2.  **Server-to-Server**: An Express API acting as a bridge, demonstrating how external services or legacy systems can securely mutate state within the Convex ecosystem.

## ✨ Features

-   **Real-time Reactivity**: Live updates across all clients without polling or manual socket management.
-   **Dual-Path Mutations**: Support for creating tasks directly from the UI or via an external Express REST endpoint.
-   **Structured Schema**: Type-safe database schema with relational-like indexing for logs and tasks.
-   **Unified Logging**: Automated logging system that tracks task creation origins (Client vs. Express).
-   **Modern Tooling**: Built with React 19, Vite, TypeScript 5.7, and Bun.

## 🛠 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, TypeScript, CSS Modules |
| **Backend (DB/Logic)** | Convex (Cloud Functions, Schema, Auth) |
| **API Bridge** | Express 5, Bun Runtime, Convex HTTP Client |
| **Language** | TypeScript (Strict Mode) |

## 🏗 Architecture

The project is organized as a monorepo with three primary services:

```text
├── client-app/        # Vite + React frontend (Reactive UI)
├── convex-backend/    # Convex schema and serverless functions (Source of Truth)
├── express-api/       # Bun + Express server (External API bridge)
```

### Data Flow
1.  **Query**: `client-app` subscribes to `tasks:get`. Convex pushes updates automatically.
2.  **Mutation (Direct)**: `client-app` calls `tasks:create`.
3.  **Mutation (Indirect)**: `client-app` calls `express-api` → `express-api` uses `ConvexHttpClient` to trigger `tasks:createFromExpress`.

## 🚀 Getting Started

### Prerequisites
-   [Node.js](https://nodejs.org/) (v18+) or [Bun](https://bun.sh/) (Recommended)
-   A [Convex](https://www.convex.dev/) account
-   NPM or Bun package manager

### 1. Backend Setup (Convex)
```bash
cd convex-backend
npm install
npx convex dev # This will prompt you to log in and create a project
```
*Keep this running to sync your schema and functions.*

### 2. API Setup (Express)
```bash
cd express-api
bun install
```
Create a `.env.local` in `express-api/`:
```env
CONVEX_URL=https://your-deployment-name.convex.cloud
PORT=3000
CLIENT_ORIGIN=http://localhost:5173
```
Run the API:
```bash
bun run dev
```

### 3. Frontend Setup (React)
```bash
cd client-app
npm install
```
Create a `.env.local` in `client-app/`:
```env
VITE_CONVEX_URL=https://your-deployment-name.convex.cloud
VITE_EXPRESS_API_URL=http://localhost:3000
```
Run the app:
```bash
npm run dev
```

## 💻 Usage

### Task Management
-   **Add (Client)**: Uses the `useMutation(api.tasks.create)` hook for an optimistic, direct update.
-   **Add via Express**: Sends a POST request to the Express server, which then communicates with Convex. This demonstrates how to integrate third-party webhooks or backend services.

### API Reference (Express Bridge)

#### `POST /debug/add-task`
Manually trigger a task creation through the Express layer.

**Request Body:**
```json
{
  "text": "Task from external API"
}
```

**Response:**
```json
{
  "ok": true
}
```

## 🔧 Development

### Directory Structure
-   `convex-backend/convex/schema.ts`: Defines the `tasks` and `logs` tables.
-   `convex-backend/convex/tasks.ts`: Contains the public API for CRUD operations.
-   `client-app/src/App.tsx`: The main UI component handling reactive queries.
-   `express-api/index.ts`: The entry point for the Bun/Express server.

### Running Tests
Currently, logic is verified through the Convex Dashboard and the local dev servers.
```bash
# Check Convex logs
npx convex dashboard
```

## 📡 Deployment

1.  **Convex**: Run `npx convex deploy` from the `convex-backend` directory.
2.  **Express API**: Can be deployed to any Node/Bun compatible host (Render, Railway, Fly.io). Ensure `CONVEX_URL` is set in production env.
3.  **Frontend**: Build using `npm run build` and host on Vercel, Netlify, or GitHub Pages.

## 🤝 Contributing

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Project maintained by [kaihere14](https://github.com/kaihere14)**