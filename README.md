# LoopFlow Monorepo

> WIP 🚧

A modern monorepo featuring Next.js applications with AI capabilities, shared UI components, and Supabase integration.

## Overview

LoopFlow is a comprehensive monorepo that demonstrates modern web development practices with TypeScript, React, and AI integration. It includes multiple applications and shared packages managed with pnpm workspaces and Turbo.

### What's Inside

**Applications:**

- **Frontend App** (`apps/frontend/`) - Next.js 15 application with Supabase authentication, featuring login flows, protected routes, and dark mode support
- **Web App** (`apps/web/`) - Clean Next.js 15 application showcasing the shared UI component library
- **Mastra Server** (`apps/mastra-server/`) - AI-powered workflow engine with agents, tools, and LibSQL storage
- **MCP Server** (`apps/mcp-server/`) - Model Context Protocol server supporting both HTTP and STDIO interfaces

**Shared Packages:**

- **UI Library** (`packages/ui/`) - Reusable component library built with shadcn/ui, Radix UI, and Tailwind CSS
- **Database** (`packages/database/`) - Type-safe Supabase client with auto-generated TypeScript types
- **ESLint Config** (`packages/eslint-config/`) - Shared linting configuration
- **TypeScript Config** (`packages/typescript-config/`) - Shared TypeScript settings

## Tech Stack

- **Framework**: Next.js 15 with Turbopack
- **Language**: TypeScript 5.7+
- **Styling**: Tailwind CSS 4.0 + shadcn/ui
- **Database**: Supabase with type-safe client
- **AI**: Mastra framework with Anthropic integration
- **Build System**: Turbo + pnpm workspaces
- **Package Manager**: pnpm 10.13.1+s

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 10.13.1+

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd loopflow

# Install dependencies
pnpm install

# Set up environment variables (see Environment Setup below)
```

### Development

```bash
# Start all applications in development mode
pnpm dev

# Or run specific apps
cd apps/frontend && pnpm dev
cd apps/mastra-server && pnpm dev
```

### Build

```bash
# Build all applications
pnpm build

# Build specific workspace
pnpm --filter @workspace/ui build
```

## Environment Setup

For applications using Supabase (frontend app and any app using `@loopflow/database`):

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Working with Components

### Adding shadcn/ui Components

```bash
# Add to shared UI package
pnpm dlx shadcn@latest add dialog -c packages/ui

# Add to specific app
pnpm dlx shadcn@latest add dialog -c apps/web
```

### Using Shared Components

```tsx
import { Button } from "@workspace/ui/components/button";
import { createClient } from "@loopflow/database";
```

## Project Structure

```
loopflow/
├── apps/
│   ├── frontend/          # Next.js + Supabase auth
│   ├── web/              # Next.js showcase app
│   ├── mastra-server/    # AI workflow server
│   └── mcp-server/       # MCP protocol server
├── packages/
│   ├── ui/               # Shared components
│   ├── database/         # Supabase client
│   ├── eslint-config/    # ESLint presets
│   └── typescript-config/# TypeScript presets
├── turbo.json           # Turbo configuration
├── pnpm-workspace.yaml  # Workspace definition
└── package.json         # Root package file
```

## Scripts Reference

### Root Commands

- `pnpm dev` - Start all apps in dev mode
- `pnpm build` - Build all packages
- `pnpm lint` - Lint all packages
- `pnpm format` - Format code with Prettier
- `pnpm clean` - Clean all node_modules

### App-Specific Commands

Each app has its own set of commands. Check individual `package.json` files or refer to the [CLAUDE.md](./CLAUDE.md) file for detailed command documentation.

## Contributing

This monorepo uses:

- ESLint for code quality
- Prettier for code formatting
- TypeScript for type safety
- Turbo for build caching

Run `pnpm lint` and `pnpm format` before committing changes.
