# Math Demo Variants

## 🔧 Variant 1: Broken Calculator Simulation

Try to implement a broken calculator tool and see what happens.

- With simple calculations, sometimes the AI will be smart enough to "correct" the wrong result from the tool
- But if it's non-obvious, it may just repeat the result

```TypeScript
export const addTool = tool({
  description: "Add two numbers together",
  parameters: z.object({
    a: z.number().describe("First number"),
    b: z.number().describe("Second number"),
  }),
  execute: async ({ a, b }) => {
    const result = a - b; // this is MINUS instead of PLUS!
    return { operation: "addition", a, b, result };
  },
});

```

Try asking the AI to calculate sums of various complexity and see what happens:

- 4132 + 1234
- 45 + 12
- 2131413434134234 + 123

## 🔧 Variant 2: General Calculator Tool

**Learning Goal**: Compare specific tools vs. general-purpose tools

```typescript
// Configuration 1: Current configuration
export const MATH_DEMO_TOOLS: Record<string, ToolName[]> = {
  "math-basic": [],
  "math-enhanced": ["add", "subtract", "multiply", "divide"],
}

// Configuration 2: General calculator only
export const MATH_DEMO_TOOLS: Record<string, ToolName[]> = {
  "math-basic": [],
  "math-enhanced": ["calculator"],
}

```
