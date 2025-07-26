# Knowledge Demo Variants

## 🎯 Original Configuration

The original demo contrasts basic LLM knowledge limitations with tool-enhanced capabilities.

```typescript
export const KNOWLEDGE_DEMO_TOOLS: Record<string, ToolName[]> = {
  "knowledge-basic": [],
  "knowledge-enhanced": ["web-search", "client-lookup", "web-fetch"],
}
```

## 🔧 Variant 1: Partial Tool Enhancement

**Learning Goal**: Show how different tools provide different types of value

```typescript
export const KNOWLEDGE_DEMO_TOOLS: Record<string, ToolName[]> = {
  "knowledge-basic": [],
  "knowledge-enhanced": ["web-search"], // Only web search, no proprietary data
}
```

**Why try this**: You'll see that web search helps with current events but still can't access internal client data. This demonstrates the difference between public and proprietary information access.

**What to expect**: When you ask about client information, the AI will explain it can search the web but still lacks access to internal systems.

## 🔧 Variant 2: Data-Only Access

**Learning Goal**: Understand the value of proprietary data vs. real-time information

```typescript
export const KNOWLEDGE_DEMO_TOOLS: Record<string, ToolName[]> = {
  "knowledge-basic": [],
  "knowledge-enhanced": ["client-lookup"], // Only internal data, no web access
}
```

**Why try this**: This shows how proprietary data access alone is valuable even without current market information. You'll see the AI can answer client questions but struggle with recent market events.

**What to expect**: Perfect for client-focused queries but helpless with "What's Tesla's latest earnings?"

## 🔧 Variant 3: Overwhelmed Assistant

**Learning Goal**: Demonstrate how tool descriptions affect AI behavior

```typescript
// Modify the tool descriptions to be overly complex
export const KNOWLEDGE_DEMO_TOOL_DESCRIPTIONS = {
  "web-search": "Advanced multi-dimensional web crawling system with semantic analysis capabilities for comprehensive information retrieval across distributed knowledge networks",
  "client-lookup": "Enterprise-grade proprietary database interface with advanced querying capabilities and real-time synchronization protocols for confidential client data management systems",
  "web-fetch": "Sophisticated content extraction engine with intelligent parsing algorithms for structured data retrieval from web-based information repositories"
}
```

**Why try this**: Overly complex descriptions can confuse the AI and make it hesitant to use tools. You'll learn that clear tool descriptions are crucial for effective AI behavior.

**What to expect**: The AI might overthink simple requests or become verbose about tool usage.
