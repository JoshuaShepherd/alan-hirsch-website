---
mode: agent
---
# AI Agent Development Guidelines

## 🚨 CRITICAL: Use Only Vendor Documentation

When developing AI Agents, Agentic Orchestration, or Voice Agents, you **MUST** exclusively use the authoritative documentation and examples found in our vendor directories. **DO NOT** import from the internet, invent new APIs, or use external patterns.

## 📁 Authoritative Sources (Use These Only)

### Core Agents Framework
- **Path**: `vendor/openai-agents-js-main/`
- **Purpose**: Core Agents framework, utilities, and reference implementations
- **What to Use**: Base agent classes, tool patterns, execution flows, error handling

### Realtime Agents UI
- **Path**: `vendor/openai-realtime-agents-main/`
- **Purpose**: Next.js-based realtime agent user interfaces
- **What to Use**: UI components, state management, realtime connection patterns

### Realtime WebSocket Client
- **Path**: `vendor/openai-realtime-api-beta-main/`
- **Purpose**: WebSocket client for realtime API communication
- **What to Use**: Connection management, message handling, audio streaming

## 🔬 Development Process (Follow This Order)

### 1. Research Phase
```bash
# Always start by exploring the vendor docs
1. Read the README files in each relevant vendor directory
2. Examine example implementations
3. Review API interfaces and type definitions
4. Understand the recommended patterns and architectures
```

### 2. Architecture Planning
- **Identify Agent Type**: Determine if you're building a standard agent, orchestration system, or voice agent
- **Map to Vendor Patterns**: Find the closest example in vendor docs
- **Plan Tool Integration**: Use only vendor-provided tool patterns
- **Design Error Handling**: Follow vendor error handling conventions

### 3. Implementation Requirements

#### For All Agents:
- ✅ Use vendor-provided base classes and interfaces
- ✅ Implement Zod validators at all tool boundaries
- ✅ Follow vendor naming conventions and file structures
- ✅ Use vendor logging and debugging patterns
- ✅ Implement proper error handling using vendor patterns

#### For Tool Development:
```typescript
// REQUIRED: Use vendor tool patterns
import { Tool } from 'vendor/openai-agents-js-main/...'

// REQUIRED: Zod validation at boundaries
import { z } from 'zod'

const ToolInputSchema = z.object({
  // Define strict input validation
})

const ToolOutputSchema = z.object({
  // Define strict output validation
})
```

#### For State Management:
- Use vendor state management patterns
- Follow vendor context and provider conventions
- Implement vendor-approved persistence strategies

#### For Communication:
- Use only vendor transport layers
- Follow vendor message formatting
- Implement vendor retry and error recovery patterns

### 4. Quality Checklist

Before completing any agent implementation, verify:

#### Architecture Compliance
- [ ] All imports reference vendor directories only
- [ ] Base classes extend from vendor-provided classes
- [ ] Tool patterns match vendor examples exactly
- [ ] Error handling follows vendor conventions

#### Type Safety
- [ ] Zod schemas define all input/output boundaries
- [ ] TypeScript interfaces match vendor specifications
- [ ] No `any` types used without vendor precedent
- [ ] Proper type guards for runtime validation

#### Best Practices
- [ ] Configuration follows vendor patterns
- [ ] Logging uses vendor logging utilities
- [ ] Testing follows vendor test patterns
- [ ] Documentation matches vendor doc structure

#### Integration Points
- [ ] WebSocket connections use vendor client patterns
- [ ] UI components follow vendor component architecture
- [ ] State synchronization uses vendor patterns
- [ ] Error boundaries implemented per vendor guidelines

## 🚫 Prohibited Practices

### Never Do This:
- ❌ Import libraries not found in vendor directories
- ❌ Create custom transport layers or connection handling
- ❌ Invent new message formats or protocols
- ❌ Bypass vendor validation patterns
- ❌ Create custom base classes that don't extend vendor classes
- ❌ Use external agent frameworks or SDKs
- ❌ Implement custom WebSocket handling outside vendor patterns

### Instead Do This:
- ✅ Find the equivalent pattern in vendor docs
- ✅ Extend vendor base classes
- ✅ Use vendor-provided utilities and helpers
- ✅ Follow vendor configuration patterns
- ✅ Implement vendor-approved customization points

## 📋 Agent Development Template

### Standard Agent Structure:
```
src/agents/
├── [agent-name]/
│   ├── index.ts          # Main agent class (extends vendor base)
│   ├── tools/            # Tool implementations (using vendor patterns)
│   ├── schemas/          # Zod validation schemas
│   ├── config/           # Configuration (vendor pattern)
│   └── tests/            # Tests (vendor test patterns)
```

### Required Files:
1. **Agent Class**: Must extend vendor base agent class
2. **Tool Definitions**: Must use vendor tool interfaces
3. **Validation Schemas**: Must use Zod for all boundaries
4. **Configuration**: Must follow vendor config patterns
5. **Error Handling**: Must use vendor error patterns

## 🎯 Example Implementation Flow

### Step 1: Research Vendor Docs
```bash
# Read the relevant vendor documentation
cat vendor/openai-agents-js-main/README.md
cat vendor/openai-agents-js-main/examples/basic-agent.ts
```

### Step 2: Implement Using Vendor Patterns
```typescript
// Use vendor base class
import { Agent } from 'vendor/openai-agents-js-main/core/Agent'
import { Tool } from 'vendor/openai-agents-js-main/tools/Tool'

// Follow vendor patterns exactly
class MyAgent extends Agent {
  // Implementation using vendor patterns
}
```

### Step 3: Validate Against Vendor Examples
- Compare your implementation to vendor examples
- Ensure all patterns match vendor conventions
- Verify tool integration follows vendor specifications

## 🔄 Continuous Compliance

### During Development:
1. **Regularly reference vendor docs** - Don't rely on memory
2. **Compare to vendor examples** - Ensure consistency
3. **Test integration points** - Verify vendor compatibility
4. **Document deviations** - If any customization needed, document why and how it aligns with vendor patterns

### Before Deployment:
1. **Full vendor compliance audit**
2. **Integration testing with vendor examples**
3. **Performance validation using vendor benchmarks**
4. **Documentation review against vendor standards**

## 🆘 When You Need Help

If you encounter a requirement that seems to need external libraries or custom implementations:

1. **First**: Re-read the vendor documentation more thoroughly
2. **Second**: Look for advanced examples or edge cases in vendor docs
3. **Third**: Check if vendor docs provide extension points or customization patterns
4. **Last Resort**: Document why vendor patterns are insufficient and propose vendor-compliant alternatives

## 📖 Success Metrics

A successful agent implementation should:
- ✅ Use 100% vendor-provided patterns and utilities
- ✅ Have complete Zod validation at all boundaries
- ✅ Follow vendor naming and structural conventions
- ✅ Integrate seamlessly with vendor examples
- ✅ Maintain vendor performance characteristics
- ✅ Support vendor debugging and monitoring tools

---

**Remember**: The goal is to build robust, maintainable agents that integrate perfectly with our vendor SDKs while following proven patterns and best practices. Always prioritize vendor compliance over custom solutions.
