# Vendor Directory Guide: OpenAI Agents Implementation

This guide provides a comprehensive overview of the vendor directory structure and all available resources for implementing AI agents using OpenAI's official frameworks and examples.

## 📁 Directory Overview

The `vendor/` directory contains three main OpenAI repositories that provide the foundation for AI agent development:

1. **`openai-agents-js-main/`** - Core agents framework and utilities
2. **`openai-realtime-agents-main/`** - Realtime agents UI implementation (Next.js)
3. **`openai-realtime-api-beta-main/`** - Realtime WebSocket client library
4. **`supabase/`** - Database integration tools

---

## 🎯 Quick Reference Matrix

| Use Case | Primary Directory | Key Files/Examples |
|----------|------------------|-------------------|
| Basic Agent Setup | `openai-agents-js-main/examples/basic/` | `agent.ts`, `README.md` |
| Realtime Voice Chat | `openai-realtime-agents-main/src/app/` | Full Next.js implementation |
| Tool Integration | `openai-agents-js-main/examples/tools/` | Various tool examples |
| Customer Service | `openai-agents-js-main/examples/customer-service/` | Complete workflow |
| Financial Research | `openai-agents-js-main/examples/financial-research-agent/` | Advanced agent patterns |
| Model Provider Setup | `openai-agents-js-main/examples/model-providers/` | Different AI providers |
| Handoff Patterns | `openai-agents-js-main/examples/handoffs/` | Agent-to-agent handoffs |
| MCP Integration | `openai-agents-js-main/examples/mcp/` | Model Context Protocol |

---

## 🚀 Core Framework: openai-agents-js-main

### 📦 Package Structure

```
packages/
├── agents/           # Main agents package
├── agents-core/      # Core utilities and types
├── agents-extensions/ # Additional functionality
├── agents-openai/    # OpenAI-specific implementations
└── agents-realtime/  # Realtime agent capabilities
```

### 🔧 Configuration Files

| File | Purpose | Usage |
|------|---------|-------|
| `package.json` | Main package configuration | Dependencies, scripts |
| `tsconfig.json` | TypeScript configuration | Compilation settings |
| `eslint.config.mjs` | Linting rules | Code quality |
| `vitest.config.ts` | Testing configuration | Unit tests |
| `pnpm-workspace.yaml` | Monorepo configuration | Package management |

### 📚 Documentation

| File | Content | Key Information |
|------|---------|----------------|
| `README.md` | Main documentation | Getting started, API overview |
| `AGENTS.md` | Agent architecture guide | Core concepts, patterns |
| `CONTRIBUTING.md` | Contribution guidelines | Development workflow |
| `SECURITY.md` | Security best practices | Safe agent implementation |

### 🎯 Example Categories

#### Basic Examples (`examples/basic/`)
- **Purpose**: Simple agent implementations
- **Files**: Basic agent setup, minimal configuration
- **Use For**: Learning fundamentals, proof of concept

#### AI SDK Integration (`examples/ai-sdk/`)
- **Purpose**: Integration with Vercel AI SDK
- **Files**: AI SDK compatibility layers
- **Use For**: Vercel ecosystem integration

#### Agent Patterns (`examples/agent-patterns/`)
- **Purpose**: Common agent design patterns
- **Files**: Reusable agent architectures
- **Use For**: Best practices implementation

#### Customer Service (`examples/customer-service/`)
- **Purpose**: Complete customer service agent
- **Files**: Full workflow implementation
- **Use For**: Business application reference

#### Financial Research (`examples/financial-research-agent/`)
- **Purpose**: Advanced research capabilities
- **Files**: Complex tool integration, data analysis
- **Use For**: Research-heavy applications

#### Handoffs (`examples/handoffs/`)
- **Purpose**: Agent-to-agent communication
- **Files**: Handoff patterns, coordination
- **Use For**: Multi-agent systems

#### MCP Integration (`examples/mcp/`)
- **Purpose**: Model Context Protocol usage
- **Files**: MCP server integration
- **Use For**: Extended context and capabilities

#### Model Providers (`examples/model-providers/`)
- **Purpose**: Different AI model integrations
- **Files**: Provider-specific implementations
- **Use For**: Multi-model support

#### Next.js Integration (`examples/nextjs/`)
- **Purpose**: Next.js application integration
- **Files**: React component integration
- **Use For**: Web application development

#### Realtime Demo (`examples/realtime-demo/`)
- **Purpose**: Basic realtime agent demo
- **Files**: Simple realtime implementation
- **Use For**: Realtime feature testing

#### Realtime Next.js (`examples/realtime-next/`)
- **Purpose**: Advanced Next.js realtime integration
- **Files**: Production-ready realtime setup
- **Use For**: Full-stack realtime applications

#### Realtime Twilio (`examples/realtime-twilio/`)
- **Purpose**: Twilio integration for voice
- **Files**: Phone system integration
- **Use For**: Voice-based applications

#### Research Bot (`examples/research-bot/`)
- **Purpose**: Research and information gathering
- **Files**: Research workflow automation
- **Use For**: Content research applications

#### Tools (`examples/tools/`)
- **Purpose**: Tool integration examples
- **Files**: Various tool implementations
- **Use For**: Extending agent capabilities

### 🧪 Testing Structure

```
integration-tests/
├── bun.test.ts          # Bun runtime tests
├── cloudflare.test.ts   # Cloudflare Workers tests
├── deno.test.ts         # Deno runtime tests
├── node.test.ts         # Node.js tests
├── vite-react.test.ts   # React integration tests
└── _helpers/            # Test utilities
```

### 🔧 Runtime Support

| Runtime | Test File | Configuration Directory |
|---------|-----------|------------------------|
| Bun | `bun.test.ts` | `bun/` |
| Cloudflare Workers | `cloudflare.test.ts` | `cloudflare-workers/` |
| Deno | `deno.test.ts` | `deno/` |
| Node.js | `node.test.ts` | `node/` |
| Vite + React | `vite-react.test.ts` | `vite-react/` |

---

## 🎬 Realtime UI: openai-realtime-agents-main

### 📱 Application Structure

```
src/app/
├── page.tsx             # Main application entry
├── layout.tsx           # Root layout
├── globals.css          # Global styles
└── components/          # React components
```

### 🎨 Styling & Configuration

| File | Purpose | Configuration |
|------|---------|---------------|
| `tailwind.config.ts` | Tailwind CSS setup | UI styling framework |
| `postcss.config.mjs` | PostCSS configuration | CSS processing |
| `next.config.ts` | Next.js configuration | App build settings |

### 🖼️ Assets & Documentation

```
public/
├── favicon.ico                      # App icon
├── openai-logomark.svg             # OpenAI branding
├── arrow.svg                       # UI elements
├── screenshot_chat_supervisor.png  # Demo screenshot
└── screenshot_handoff.png          # Handoff demo
```

### 🔧 Environment Setup

- **`.env.sample`**: Template for environment variables
- **Key Variables**: API keys, configuration options

---

## 🌐 Realtime Client: openai-realtime-api-beta-main

### 📦 Library Structure

```
lib/
├── api.js            # Core API interface
├── client.js         # WebSocket client
├── conversation.js   # Conversation management
├── event_handler.js  # Event processing
└── utils.js          # Utility functions
```

### 🔧 Core Components

| Component | Purpose | Key Features |
|-----------|---------|--------------|
| **API** | Main interface | Connection management, authentication |
| **Client** | WebSocket handling | Real-time communication |
| **Conversation** | State management | Message history, context |
| **Event Handler** | Event processing | Real-time event routing |
| **Utils** | Helper functions | Common utilities |

### 📝 Examples & Testing

```
examples/
└── node_devenv.mjs   # Development environment setup

test/
├── index.js          # Test suite entry
└── samples/          # Test samples and fixtures
```

---

## 🗄️ Database Integration: supabase

### 🔧 CLI Tools

```
.temp/
├── cli-latest        # Latest CLI version
├── gotrue-version    # Auth service version
├── pooler-url        # Connection pooling
├── postgres-version  # Database version
├── project-ref       # Project reference
├── rest-version      # REST API version
└── storage-version   # Storage service version
```

---

## 🎯 Implementation Pathways

### For Content Creation Agents

**Recommended Path:**
1. Start with `openai-agents-js-main/examples/basic/`
2. Integrate tools from `examples/tools/`
3. Add realtime features from `openai-realtime-agents-main/`
4. Use `research-bot` example for content research

**Key Files:**
- `examples/research-bot/` - Content research patterns
- `examples/tools/` - Content creation tools
- `packages/agents-extensions/` - Extended capabilities

### For Customer Support Agents

**Recommended Path:**
1. Use `examples/customer-service/` as foundation
2. Integrate `examples/handoffs/` for escalation
3. Add realtime voice with `openai-realtime-agents-main/`
4. Use Twilio integration for phone support

**Key Files:**
- `examples/customer-service/` - Complete workflow
- `examples/handoffs/` - Escalation patterns
- `examples/realtime-twilio/` - Voice integration

### For Research & Analysis Agents

**Recommended Path:**
1. Start with `examples/financial-research-agent/`
2. Adapt research patterns for content analysis
3. Integrate MCP for extended context
4. Use advanced tool patterns

**Key Files:**
- `examples/financial-research-agent/` - Research patterns
- `examples/mcp/` - Context extension
- `examples/tools/` - Analysis tools

### For Multi-Agent Systems

**Recommended Path:**
1. Study `examples/handoffs/` patterns
2. Implement agent coordination
3. Use supervisor patterns
4. Add realtime orchestration

**Key Files:**
- `examples/handoffs/` - Agent coordination
- `examples/agent-patterns/` - Orchestration patterns
- Screenshots show supervisor implementations

---

## 🔧 Development Workflow

### 1. Setup Phase
```bash
# Install dependencies
cd vendor/openai-agents-js-main
pnpm install

# Set up environment
cp .env.sample .env
# Configure API keys and settings
```

### 2. Example Exploration
```bash
# Run basic example
cd examples/basic
npm start

# Test realtime features
cd ../openai-realtime-agents-main
npm run dev
```

### 3. Integration Testing
```bash
# Run integration tests
cd openai-agents-js-main
npm run test:integration
```

### 4. Custom Implementation
- Copy relevant example as starting point
- Modify for specific use case
- Integrate with existing Alan Hirsch platform
- Test with provided test suites

---

## 🚀 Best Practices

### Code Organization
- Use TypeScript for type safety
- Follow the monorepo package structure
- Implement proper error handling
- Use provided testing frameworks

### Security
- Follow `SECURITY.md` guidelines
- Validate all inputs
- Use environment variables for secrets
- Implement proper authentication

### Performance
- Use streaming for realtime features
- Implement proper caching
- Monitor token usage
- Optimize for specific runtimes

### Maintenance
- Follow `CONTRIBUTING.md` guidelines
- Use provided linting configuration
- Implement comprehensive testing
- Document custom implementations

---

## 📋 Quick Start Checklist

### For New Agent Implementation:

- [ ] Review relevant examples in `openai-agents-js-main/examples/`
- [ ] Set up development environment with proper runtime
- [ ] Configure environment variables using `.env.sample`
- [ ] Choose appropriate packages from `packages/` directory
- [ ] Implement basic agent using core framework
- [ ] Add tools and extensions as needed
- [ ] Integrate realtime features if required
- [ ] Test with provided test suites
- [ ] Document custom implementation
- [ ] Deploy using supported runtime environment

### For Realtime Features:

- [ ] Set up `openai-realtime-agents-main` Next.js project
- [ ] Configure WebSocket client from `openai-realtime-api-beta-main`
- [ ] Implement event handling patterns
- [ ] Add voice capabilities if needed
- [ ] Test with various client types
- [ ] Optimize for performance
- [ ] Add proper error handling
- [ ] Document realtime workflows

---

## 🔗 Key Resources

| Resource Type | Location | Description |
|---------------|----------|-------------|
| **Core Documentation** | `openai-agents-js-main/README.md` | Main framework guide |
| **Architecture Guide** | `openai-agents-js-main/AGENTS.md` | Agent design patterns |
| **API Reference** | `openai-realtime-api-beta-main/README.md` | Realtime API documentation |
| **UI Examples** | `openai-realtime-agents-main/public/` | Screenshot references |
| **Test Examples** | `*/test/` directories | Testing patterns |
| **Configuration** | Various `*.config.*` files | Setup templates |

This guide provides the foundation for implementing sophisticated AI agents that can enhance the Alan Hirsch platform's content creation, customer service, and research capabilities while following OpenAI's official patterns and best practices.