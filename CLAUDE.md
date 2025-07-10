# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a monorepo using pnpm workspaces and Turbo for build orchestration. The project contains multiple applications and shared packages:

### Applications
- `apps/frontend/` - Next.js app with Supabase authentication and shadcn/ui components
- `apps/web/` - Next.js app using the shared UI workspace package
- `apps/mastra-server/` - Mastra framework server with AI agents and workflows
- `apps/mcp-server/` - XMCP server implementation with tools

### Shared Packages
- `packages/ui/` - Shared UI components using shadcn/ui, Radix UI, and Tailwind CSS
- `packages/eslint-config/` - Shared ESLint configurations
- `packages/typescript-config/` - Shared TypeScript configurations

## Development Commands

### Root Level Commands
```bash
# Install dependencies
pnpm install

# Start all apps in development mode
pnpm dev

# Build all apps
pnpm build

# Lint all packages
pnpm lint

# Format code
pnpm format

# Clean all node_modules
pnpm clean
```

### Application-Specific Commands

#### Frontend App (apps/frontend/)
```bash
# Development with Turbopack
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint
pnpm lint
```

#### Web App (apps/web/)
```bash
# Development with Turbopack
pnpm dev

# Build for production
pnpm build

# Type checking
pnpm typecheck

# Lint and fix
pnpm lint:fix
```

#### Mastra Server (apps/mastra-server/)
```bash
# Development mode
pnpm dev

# Build
pnpm build

# Start production server
pnpm start
```

#### MCP Server (apps/mcp-server/)
```bash
# Development mode
pnpm dev

# Build
pnpm build

# Start HTTP server
pnpm start-http

# Start STDIO server
pnpm start-stdio
```

## Architecture Overview

### Frontend Applications
- Both frontend apps use Next.js 15 with React 19
- `apps/frontend/` includes Supabase integration for authentication
- `apps/web/` uses the shared `@workspace/ui` package for components
- Both apps support dark mode via next-themes
- Styling is done with Tailwind CSS and shadcn/ui components

### Backend Services
- **Mastra Server**: AI-powered workflow engine with:
  - Agents for AI interactions
  - Workflows for complex processes
  - Tools for external integrations
  - In-memory LibSQL storage for development
- **MCP Server**: Model Context Protocol server with:
  - Tool-based architecture
  - HTTP and STDIO interfaces
  - Zod schemas for validation

### Shared UI System
- Central `@workspace/ui` package provides reusable components
- Built on Radix UI primitives with shadcn/ui styling
- Components use class-variance-authority for variant handling
- Includes utility functions and consistent theming

## Key Technologies

- **Framework**: Next.js 15 with Turbopack
- **Language**: TypeScript 5.7+
- **Styling**: Tailwind CSS 4.0
- **UI Components**: Radix UI + shadcn/ui
- **Authentication**: Supabase (frontend app)
- **AI Framework**: Mastra with Anthropic integration
- **Build Tool**: Turbo + pnpm workspaces
- **Package Manager**: pnpm

## Development Workflow

1. Run `pnpm install` at the root to install all dependencies
2. Use `pnpm dev` to start all applications in development mode
3. Individual apps can be developed using their specific commands
4. The UI package is automatically linked and hot-reloaded across apps
5. Use `pnpm lint` and `pnpm format` to maintain code quality
6. Build production versions with `pnpm build`

## Adding shadcn/ui Components

To add new shadcn/ui components to the shared UI package:

```bash
# From the root directory
pnpm dlx shadcn@latest add button -c packages/ui

# Or for a specific app
pnpm dlx shadcn@latest add button -c apps/web
```

## Environment Setup

- Node.js 20+ required
- pnpm 10.13.1+ as package manager
- Supabase environment variables needed for frontend app:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`