# Aether - Full-Featured 

Aether is a high-fidelity, production-grade workflow automation platform inspired by n8n.

## Features

- **Visual Workflow Editor**: Powered by React Flow with support for Light and "Midnight" Dark themes.
- **Robust Execution Engine**: Traverse complex node graphs with support for branching and parallel execution.
- **Modular Node Architecture**: Dynamically load nodes from built-in sources or NPM.
- **Binary Data Handling**: Process files and images with local storage persistence.
- **Credential Management**: Securely store API keys using AES-256 encryption.
- **Task Queue**: Reliable background processing and long-running workflows (Wait/Delay) using Redis and BullMQ.
- **User Accounts & RBAC**: Owner, Admin, and Member roles with JWT-based authentication.
- **Webhook Triggers**: Trigger workflows via external HTTP requests.

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, React Flow.
- **Backend**: Node.js, TypeScript, Express, TypeORM.
- **Database**: PostgreSQL.
- **Queue/Cache**: Redis.
- **DevOps**: Docker & Docker Compose.

## Getting Started

### Prerequisites

- Docker and Docker Compose

### Running the App

1. Clone the repository.
2. Create a `.env` file in the root (optional, defaults are provided):
   ```env
   ENCRYPTION_KEY=your_32_char_secret_key
   JWT_SECRET=your_jwt_secret
   ```
3. Start the entire stack:
   ```bash
   docker-compose up --build
   ```
4. Access the UI at `http://localhost:3000`.
5. Access the Backend API at `http://localhost:3001`.

## Project Structure

- `apps/frontend`: React application (Canvas and Property Panel).
- `apps/backend`: Express server and Workflow Engine.
- `apps/backend/src/engine`: Core logic for workflow execution and expressions.
- `apps/backend/src/engine/nodes`: Built-in node implementations (Start, HTTP Request, If, Set, Code, Wait).
- `packages/nodes-base`: Shared node types and base classes.

## License

MIT
