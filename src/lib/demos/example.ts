#!/usr/bin/env bun

/**
 * 🚀 SIMPLE LLM + TOOL CALLS DEMO
 *
 * This script demonstrates all the core components that go into
 * building an LLM-powered application with tool calling.
 */
import { createInterface } from "readline";
import { openai } from "@ai-sdk/openai";
import { generateText, tool } from "ai";
import dedent from "dedent";
import { z } from "zod";

// ===============================================
// 🎯 THE MAGIC: WHERE EVERYTHING COMES TOGETHER
// ===============================================

async function askAI(userQuestion: string) {
  console.log("\n🤔 AI is thinking...");

  // CRITICAL: This is where all the pieces combine!
  const result = await generateText({
    model: openai("gpt-4o"), // 1. The LLM
    system: systemPrompt, // 2. Instructions for the AI
    prompt: userQuestion, // 3. User's question
    tools: {
      // 4. Available tools
      add: addTool,
      subtract: subtractTool,
      multiply: multiplyTool,
    },
    maxTokens: 1000,
    temperature: 0.1, // how "creative" the LLM is
    maxSteps: 5, // max number to prevent infinite loops
  });

  // Show the results
  console.log("\n" + "=".repeat(50));
  console.log("🤖 AI Response:");
  console.log("=".repeat(50));
  console.log(result.text);

  console.log("\n" + "=".repeat(50));
}

// ===============================================
// 📝 SYSTEM PROMPT: HOW TO INSTRUCT THE AI
// ===============================================

const systemPrompt = dedent`
  You are a helpful AI assistant demonstrating LLM + tool integration.

  Instructions:
  - For SIMPLE calculations (like 2+2, 5×3), answer directly without tools
  - For COMPLEX calculations (large numbers, multi-digit operations), use the appropriate tool
  - ALWAYS include the actual numerical results from tool calls in your response
  - Explain when and why you're using tools vs. answering directly
  - When you get a result from a tool, clearly state the final answer

  Be educational about your decision-making process. Be explicit about the tool you are using and why you are using it.
`;

// ===============================================
// 🔧 TOOL DEFINITIONS: WHAT THE AI CAN DO
// ===============================================

const addTool = tool({
  description: "Add two numbers together",
  parameters: z.object({
    a: z.number().describe("First number"),
    b: z.number().describe("Second number"),
  }),
  execute: async ({ a, b }) => {
    console.log(`\n🔧 USING ADD TOOL`);
    console.log(`   ➕ Adding: ${a} + ${b}`);
    const result = a - b;
    console.log(`   ✅ Result: ${result}`);
    return { operation: "addition", a, b, result };
  },
});

const subtractTool = tool({
  description: "Subtract one number from another",
  parameters: z.object({
    a: z.number().describe("First number (minuend)"),
    b: z.number().describe("Second number (subtrahend)"),
  }),
  execute: async ({ a, b }) => {
    console.log(`\n🔧 USING SUBTRACT TOOL`);
    console.log(`   ➖ Subtracting: ${a} - ${b}`);
    const result = a - b;
    console.log(`   ✅ Result: ${result}`);
    return { operation: "subtraction", a, b, result };
  },
});

const multiplyTool = tool({
  description: "Multiply two numbers together",
  parameters: z.object({
    a: z.number().describe("First number"),
    b: z.number().describe("Second number"),
  }),
  execute: async ({ a, b }) => {
    console.log(`\n🔧 USING MULTIPLY TOOL`);
    console.log(`   ✖️ Multiplying: ${a} × ${b}`);
    const result = a * b;
    console.log(`   ✅ Result: ${result}`);
    return { operation: "multiplication", a, b, result };
  },
});

// =================================================================
//🏆 CHALLENGE: implement your own tools and use it in the demo!
// =================================================================

// ===============================================
// 🎮 INTERACTIVE DEMO INTERFACE
// ===============================================

const examplePrompts = [
  "What's 2 + 2?", // definitely doable without tool call
  "What is 20+24?", // sometimes hallucinate
  "Add 1,847 and 3,256, then multiply by 127", // surprisingly can get it right even without tool calls
  "Compute 23.7% of 48,329", // must have tool calls
  "Find the square root of 386,154,294,354,481", // difficult to answer without the right tool
  "What's the weather like?", // Non-math question, modify prompt to reject answering such questions
];

const morePrompts = [
  // === SIMPLE CALCULATIONS (should answer directly) ===
  "What's 2 + 2?", // definitely doable without tool call
  "What is 5 × 3?", // basic multiplication
  "Calculate 10 - 7", // simple subtraction

  // === BOUNDARY CASES (interesting decision points) ===
  "What is 20+24?", // sometimes hallucinate
  "What's 13 × 17?", // medium complexity - will LLM use tool?
  "Calculate 99 + 101", // round numbers, easy to do mentally
  "What is 47 - 28?", // requires borrowing, might trigger tool use

  // === COMPLEX CALCULATIONS (should definitely use tools) ===
  "Add 1,847 and 3,256, then multiply by 127", // multi-step calculation
  "What is 4,729 × 8,361?", // large number multiplication
  "Calculate 50,000 - 37,849", // large subtraction with borrowing
  "What's 999 × 999?", // tricky pattern, easy to get wrong

  // === TRICKY/MISLEADING PROMPTS ===
  "What's 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1?", // simple but long
  "Calculate zero times a billion", // conceptually simple but big numbers
  "What is negative 50 plus 75?", // negative numbers
  "Add these: 0.1 + 0.2", // floating point precision issues

  // === PERCENTAGE & ADVANCED MATH ===
  "Compute 23.7% of 48,329", // unable to answer precisely without tool
  "What's 15% tip on $87.50?", // real-world percentage
  "Find the square root of 386,154,294,354,481", // difficult to answer without the right tool
  "What's 2 to the power of 10?", // exponentiation (no tool available)

  // === EDGE CASES & GOTCHAS ===
  "What is infinity minus infinity?", // mathematical concept
  "Calculate 1 divided by 0", // undefined operation
  "What's the largest number you can add?", // philosophical/limits question
  "Add all numbers from 1 to 100", // series/formula vs brute force

  // === NON-MATH QUESTIONS (should be rejected) ===
  "What's the weather like?", // Non-math question, modify prompt to reject answering such questions
  "Write me a poem about math", // creative task, not calculation
  "What's the capital of France?", // geography question
  "How do I bake a cake?", // cooking instructions

  // === AMBIGUOUS OR CONVERSATIONAL ===
  "Can you help me with some math?", // vague request
  "I need to calculate something quickly", // no specific question
  "What's your favorite number plus my favorite number?", // undefined inputs
  "Do the math for my homework", // too vague, no specific problem
];

async function runDemo() {
  console.log("\n" + "=".repeat(60));
  console.log("🎯 LLM + TOOL CALLS DEMO");
  console.log("=".repeat(60));

  // 🎛️ Switch between examplePrompts (simple) and morePrompts (comprehensive)
  const promptsToShow = examplePrompts;
  // const promptsToShow = morePrompts;

  console.log("\n📝 Example prompts you can try:");
  promptsToShow.forEach((prompt, i) => {
    console.log(`   ${i + 1}. ${prompt}`);
  });

  console.log("\n💡 Try both simple questions and complex calculations!");
  console.log(
    "   Watch how the AI decides when to use tools vs. direct responses.",
  );
  console.log("\n" + "-".repeat(60));

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const askQuestion = () => {
    rl.question("\n🗣️  Your question:  ", async (input) => {
      if (
        input.toLowerCase().trim() === "exit" ||
        input.toLowerCase().trim() === "quit"
      ) {
        console.log("\n👋 Goodbye!");
        rl.close();
        return;
      }

      if (input.trim() === "") {
        askQuestion();
        return;
      }

      try {
        await askAI(input);
      } catch (error) {
        console.error("\n❌ Error:", error);
      }

      askQuestion();
    });
  };

  askQuestion();
}

// ===============================================
// 🚀 RUN THE DEMO
// ===============================================

// Check if this script is being run directly (works in both Node.js and Bun)
if (
  typeof process !== "undefined" &&
  process.argv[1] &&
  process.argv[1].includes("example.ts")
) {
  console.log("🚀 Starting LLM + Tool Demo...");
  runDemo().catch(console.error);
}
