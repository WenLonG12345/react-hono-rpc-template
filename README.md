# React + Hono Fullstack Template

A modern, reusable template for building fullstack web applications using React (with Tanstack Router) for the frontend and Hono for the backend. This template is designed for developers who want a fast, flexible alternative to Next.js, with a focus on simplicity, performance, and full control over the stack.

## Why This Template?

After experiencing lag and complexity with Next.js, this template was created to provide a smoother, more customizable fullstack experience. Use this as a starting point for any new project—just clone, update the project name, and start building!

## Features

- **100% TypeScript**
- **Backend:**
  - [Hono](https://hono.dev) (runtime-agnostic server framework)
  - Postgres (database)
  - Prisma (ORM for Postgres)
  - Auth (using better-auth, with server-side sessions via cookies)
  - Zod validator middleware
  - OpenAPI documentation generation (planned)
- **Frontend:**
  - React + [Tanstack Router](https://tanstack.com/router/latest)
  - TailwindCSS v5
  - shadcn/ui components
  - @tanstack/react-query (data fetching)
  - react-hook-form (form handling)
  - Zustand (state management)
- **Build System:**
  - Vite (frontend bundler)
  - BiomeJS (linting & formatting)
  - tsup (server bundling)

## Repository Structure

All code resides in a single repository for simplicity and ease of deployment:

- `/app` – Frontend application (React + Tanstack Router)
- `/content` – Static content (blog, docs)
- `/public` – Public assets
- `/server` – Backend (Hono server, API, auth, database)
- `/prisma` – Prisma schema and generated client

## Authentication

Authentication follows Lucia's best practices (server-side sessions via cookies). Cookies are shared across domains, so it's recommended to host the server on a subdomain and the site on the main domain.

## Hono RPC: Calling Backend Functions from React

This template uses Hono's handler functions as RPC endpoints, making it easy to call backend logic directly from your React frontend. You can use `@tanstack/react-query` together with the Hono client to call your backend endpoints using the `.$get`, `.$post`, etc. helpers for type-safe requests.

### Example: Fetching Data from a Hono Endpoint with .$get

Suppose you have a backend route in `/server/main.ts`:

```ts
// server/main.ts
import { Hono } from "hono";
const app = new Hono();

app.get("/api/greet", (c) => {
  return c.json({ message: "Hello from Hono!" });
});
```

On the frontend, use the Hono client to call this endpoint with `.$get`:

```ts
// app/routes/index.tsx
import { hc } from 'hono/client';
import { useQuery } from '@tanstack/react-query';

const client = hc('/api');

function useGreet() {
  return useQuery({
    queryKey: ['greet'],
    queryFn: async () => {
      // Type-safe call to /api/greet
      return client.greet.$get().then(res => res.json());
    },
  });
}

export default function HomePage() {
  const { data, isLoading } = useGreet();
  if (isLoading) return <div>Loading...</div>;
  return <div>{data?.message}</div>;
}
```

- For POST/PUT requests, use `client.yourEndpoint.$post({ json: ... })` in your query/mutation function.
- You can organize your API calls in a `/app/api/` folder for better structure.

This pattern gives you a simple, type-safe way to connect your frontend and backend, similar to tRPC but with full control and flexibility using Hono's client helpers.

## Getting Started

1. **Clone this template:**

   ```sh
   git clone <your-repo-url> <your-project-name>
   cd <your-project-name>
   ```

2. **Configure environment variables:**

   - Copy `.env.example` to `.env` and update values as needed.

3. **Set up database and dependencies:**

   ```sh
   ./start-database.sh
   pnpm install
   ```

4. **Start the development servers:**

   ```sh
   pnpm dev          // hono backend (http://localhost:3000)
   pnpm dev:app      // react frontend (http://localhost:4321)
   ```

## Customization

- Update the project name, description, and metadata as needed.
- Add or remove features to fit your use case.
- Refer to the `/server` and `/app` folders for backend and frontend customization.

## Contributing & Feedback

This template is a work in progress and aims to be as helpful as possible for the community. If you spot anything missing, have suggestions, or want to improve the template, please open an issue or submit a pull request (PR)!

Your feedback and contributions are very welcome and will help make this template even better for everyone.

---

**Happy hacking!**
