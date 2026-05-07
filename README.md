# ConvexDB Ecosystem

[![Build Status](https://img.shields.io/badge/status-active-success.svg)](#)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Convex](https://img.shields.io/badge/Database-Convex-ff69b4.svg)](https://convex.dev)
[![React](https://img.shields.io/badge/Frontend-React_19-61dafb.svg)](https://react.dev)

A sophisticated full-stack monorepo demonstrating the integration of **Convex** (a real-time backend-as-a-service) with a **React** frontend, an **Express.js** bridge API, and a dedicated **RAG (Retrieval-Augmented Generation)** server.

This project serves as a blueprint for building AI-ready applications that require real-time data synchronization, external API interoperability, and vector-based search capabilities.

---

## 🏗️ Architecture

The repository is organized into two primary domains:

### 1. Convex Domain (`/Convex`)
*   **`client-app`**: A modern React 19 frontend powered by Vite and TypeScript.
*   **`convex-backend`**: The core database schema and serverless functions (mutations/queries) running on Convex.
*   **`express-api`**: A Bun-powered Express server that acts as a secure bridge for external systems to interact with the Convex backend using the `ConvexHttpClient`.

### 2. RAG Domain (`/RAG`)
*   **`server`**: A specialized TypeScript Express server designed for document ingestion and retrieval-augmented generation workflows.

---

## 🚀 Features

*   **Real-time Reactivity**: Automatic UI updates via Convex subscriptions.
*   **Cross-Runtime Compatibility**: Seamless integration between Bun (Express API) and Node.js (RAG Server).
*   **Type-Safe Database Access**: End-to-end TypeScript safety from Convex functions to the React frontend.
*   **External Bridge**: Ability to trigger Convex mutations from standard REST endpoints.
*   **RAG Ready**: Dedicated infrastructure for processing and querying vector data.

---

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React 19, Vite, TypeScript |
| **Backend-as-a-Service** | Convex |
| **API Bridge** | Express, Bun, Dotenv |
| **RAG Server** | Node.js, Express, TypeScript |
| **Package Management** | npm / Bun |

---

## 🚦 Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18+)
*   [Bun](https://bun.sh/) (for the Express API)
*   [Convex Account](https://www.convex.dev/)

### Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/kaihere14/ConvexDB.git
    cd ConvexDB
    ```

2.  **Setup Convex Backend**
    ```bash
    cd Convex/convex-backend
    npm install
    npx convex dev # This will prompt you to create a project
    ```

3.  **Setup Express API**
    ```bash
    cd ../express-api
    bun install
    cp .env.example .env.local # Ensure CONVEX_URL is set from your Convex dashboard
    ```

4.  **Setup Client App**
    ```bash
    cd ../client-app
    npm install
    ```

5.  **Setup RAG Server**
    ```bash
    cd ../../RAG/server
    npm install
    ```

---

## 💻 Usage

### Running the Development Environment

You will need multiple terminal tabs to run the full ecosystem:

*   **Convex Sync**: `cd Convex/convex-backend && npx convex dev`
*   **Express Bridge**: `cd Convex/express-api && bun dev` (Runs on port 3000)
*   **React Frontend**: `cd Convex/client-app && npm run dev` (Runs on port 5173)
*   **RAG Server**: `cd RAG/server && npm run dev` (Runs on port 4000)

### API Endpoints

#### Express API (`:3000`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Service health check |
| `POST` | `/debug/add-task` | Injects a task directly into Convex |

**Example Request:**
```bash
curl -X POST http://localhost:3000/debug/add-task \
     -H "Content-Type: application/json" \
     -d '{"text": "Complete README documentation"}'
```

#### RAG Server (`:4000`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | RAG server health check |
| `GET` | `/` | Root status check |

---

## ⚙️ Configuration

### Environment Variables

**Express API (`Convex/express-api/.env.local`)**
```env
CONVEX_URL=https://your-deployment-name.convex.cloud
PORT=3000
CLIENT_ORIGIN=http://localhost:5173
```

---

## 📂 Directory Structure

```
.
├── Convex/
│   ├── client-app/       # React + Vite Frontend
│   ├── convex-backend/   # Convex Schema & Functions
│   └── express-api/      # Bun + Express Bridge
└── RAG/
    └── server/           # TypeScript RAG Implementation
        ├── src/
        │   ├── index.ts  # Server Entry
        │   └── scripts/  # Ingestion scripts
        └── tsconfig.json
```

---

## 🧪 Development

### Code Style
The project uses TypeScript for all components. Ensure types are strictly defined, especially when using `makeFunctionReference` for Convex calls within the Express API.

### Testing
Currently, the project structure supports testing via:
*   **RAG Server**: `npm test` (Placeholder configured)
*   **Client**: Vite-based testing (can be added via Vitest)

---

## 🗺️ Roadmap

- [ ] Implement Vector Search in `convex-backend`.
- [ ] Add PDF processing to `RAG/server/src/scripts/ingest.ts`.
- [ ] Integrate RAG results into the `client-app` UI.
- [ ] Add authentication via Clerk or Convex Auth.

---

## 📄 License

This project is licensed under the **ISC License**. See the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request