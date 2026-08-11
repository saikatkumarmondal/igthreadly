# IGThreadly

**AI-Powered Instagram Automation & Lead Generation Platform**

IGThreadly is a multi-tenant SaaS platform that helps creators, agencies, coaches, e-commerce businesses, and service providers turn Instagram engagement into qualified sales leads — automatically.

> Instagram Engagement → AI Conversation → Qualification → Lead → Sales Pipeline → Conversion

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?logo=postgresql)](https://neon.tech/)
[![Redux Toolkit](https://img.shields.io/badge/State-Redux%20Toolkit-764ABC?logo=redux)](https://redux-toolkit.js.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## Table of Contents

- [Overview](#overview)
- [Core Features](#core-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [API Testing](#api-testing)
- [Development Roadmap](#development-roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Businesses publish Instagram posts asking users to comment a keyword (e.g. *"Comment GUIDE for our free marketing guide"*). IGThreadly automatically detects the comment, replies publicly, opens a DM conversation, and hands the conversation to an AI sales agent that:

- Understands prospect intent using conversation memory
- Asks configurable qualification questions
- Scores and tags the lead
- Creates/updates a CRM record
- Moves the lead through a custom sales pipeline
- Notifies the team when human intervention is needed

The platform is built **multi-tenant from day one** — every workspace's data (Instagram accounts, automations, leads, conversations) is fully isolated at the database and API layer.

## Core Features

| Module | Description |
|---|---|
| **Authentication** | Email/password auth via Auth.js, session-based, workspace-aware |
| **Multi-Tenant Workspaces** | Organization-scoped data with role-based access (Owner, Admin, Manager, Agent) |
| **Instagram Integration** | Official Meta Graph API — comments, DMs, webhooks, token lifecycle |
| **Comment & DM Automation** | Keyword-triggered rules with configurable actions |
| **AI Sales Agent** | Context-aware conversational agent with pluggable AI provider (Gemini, OpenRouter, Ollama) |
| **Lead Qualification & Scoring** | Configurable qualification rules and a 0–100 lead scoring model |
| **Built-in CRM** | Lead list, lead detail, tags, status, pipeline stages |
| **Unified Inbox** | AI/human conversation handling with human handoff triggers |
| **Analytics** | Conversion funnel, automation performance, AI agent performance |
| **Billing-Ready Schema** | Plan, usage, and limit tracking, ready for payment integration |

## Tech Stack

**Frontend**
- Next.js (App Router) · TypeScript · React
- Tailwind CSS · shadcn/ui
- Redux Toolkit + RTK Query
- React Hook Form + Zod

**Backend**
- Next.js Route Handlers & Server Actions
- Zod server-side validation
- Auth.js (NextAuth v5) — Credentials provider

**Database**
- PostgreSQL (Neon, serverless)
- Prisma ORM

**AI**
- Provider-agnostic `AIService` abstraction
- Default: Google Gemini (free tier)
- Swappable: OpenRouter, Ollama (local)

## Architecture

```text
                    ┌──────────────────────┐
                    │      Instagram       │
                    │ Graph API / Webhooks │
                    └──────────┬────────────┘
                               ▼
                    ┌──────────────────────┐
                    │ Instagram Integration│
                    │       Service        │
                    └──────────┬────────────┘
                               ▼
┌──────────────┐     ┌──────────────────────┐
│   Next.js    │────▶│  Automation Engine   │
│   Dashboard  │     └──────────┬────────────┘
└──────────────┘                │
                 ┌───────────────┼───────────────┐
                 ▼               ▼               ▼
          ┌────────────┐  ┌────────────┐  ┌────────────┐
          │ AI Agent   │  │ Lead Engine│  │ Workflow   │
          └─────┬──────┘  └─────┬──────┘  └─────┬──────┘
                 └───────────────┼───────────────┘
                                 ▼
                       ┌──────────────────┐
                       │    Prisma ORM     │
                       └─────────┬─────────┘
                                 ▼
                       ┌──────────────────┐
                       │  Neon PostgreSQL  │
                       └──────────────────┘
```

Every tenant-owned record carries an `organizationId`, and all protected API routes enforce, in order: **authentication → organization membership → role permission → resource ownership**.

## Project Structure

```text
igthreadly/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (dashboard)/
│   │   │   └── dashboard/
│   │   └── api/
│   │       ├── auth/
│   │       └── organizations/
│   ├── components/
│   │   ├── layout/
│   │   ├── providers/
│   │   └── ui/
│   ├── lib/
│   │   ├── auth/
│   │   ├── db/
│   │   ├── redux/
│   │   │   ├── api/
│   │   │   └── slices/
│   │   ├── services/
│   │   ├── utils/
│   │   └── validations/
│   └── types/
├── .env
├── .gitignore
├── next.config.ts
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm
- A [Neon](https://neon.tech) Postgres database (free tier)
- A [Google AI Studio](https://aistudio.google.com) API key (free tier, for the AI agent)
- A Meta Developer App + Instagram Professional Account (required later for Instagram integration)

### Installation

```bash
git clone https://github.com/saikatkumarmondal/igthreadly.git
cd igthreadly
npm install
```

### Run the development server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env` file in the project root:

```env
# Database (Neon — pooled + direct connection strings)
DATABASE_URL="postgresql://user:password@ep-xxxx-pooler.region.aws.neon.tech/igthreadly?sslmode=require"
DIRECT_URL="postgresql://user:password@ep-xxxx.region.aws.neon.tech/igthreadly?sslmode=require"

# Auth.js
AUTH_SECRET="generate-with: npx auth secret"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Instagram Graph API
INSTAGRAM_APP_ID=
INSTAGRAM_APP_SECRET=
INSTAGRAM_REDIRECT_URI=

# AI Provider
AI_PROVIDER="gemini"
AI_API_KEY=
```

> Never commit `.env` to version control. It is already covered by `.gitignore`.

## Database Setup

```bash
npx prisma migrate dev --name init
npx prisma generate
```

Inspect data with Prisma Studio:

```bash
npx prisma studio
```

## API Testing

All backend endpoints are verified with **Postman** before frontend integration.

| Endpoint | Method | Description |
|---|---|---|
| `/api/auth/register` | `POST` | Create a new user account |
| `/api/auth/callback/credentials` | `POST` | Session login (Auth.js) |
| `/api/organizations` | `POST` | Create a new workspace |
| `/api/organizations` | `GET` | List the authenticated user's workspaces |

A shared Postman collection is maintained separately for the team; import it and set the `base_url` variable to `http://localhost:3000`.

## Development Roadmap

- [x] **Sprint 1 — Foundation:** Next.js setup, Prisma schema, Auth.js, RBAC, Redux store
- [ ] **Sprint 2 — Instagram Integration:** OAuth, webhook infrastructure, comment ingestion
- [ ] **Sprint 3 — Automation Engine:** Triggers, conditions, comment reply & DM workflows
- [ ] **Sprint 4 — AI Agent:** Provider abstraction, prompt architecture, intent classification, lead scoring
- [ ] **Sprint 5 — CRM & Inbox:** Conversation inbox, lead management, pipeline, human handoff
- [ ] **Sprint 6 — Analytics & Production:** Dashboard analytics, audit logs, rate limiting, deployment

See [Project Objective](#) documentation for full MVP and Phase 2/3 scope.

## Contributing

1. Create a feature branch: `git checkout -b feat/your-feature-name`
2. Follow the existing code style (TypeScript strict mode, ESLint, Prettier)
3. Write meaningful commit messages ([Conventional Commits](https://www.conventionalcommits.org/))
4. Open a pull request for review

## License

This project is licensed under the [MIT License](LICENSE).