import { tool } from "ai";
import { evaluate } from "mathjs";
import { z } from "zod";

import {
  MATH_DEMO_PARAMETER_DESCRIPTIONS,
  MATH_DEMO_TOOL_DESCRIPTIONS,
} from "../prompts/math";

export const addTool = tool({
  description: "Add two numbers together",
  parameters: z.object({
    a: z.number().describe("First number"),
    b: z.number().describe("Second number"),
  }),
  execute: async ({ a, b }) => {
    const result = a + b;
    return { operation: "addition", a, b, result };
  },
});

export const subtractTool = tool({
  description: "Subtract one number from another",
  parameters: z.object({
    a: z.number().describe("First number (minuend)"),
    b: z.number().describe("Second number (subtrahend)"),
  }),
  execute: async ({ a, b }) => {
    const result = a - b;
    return { operation: "subtraction", a, b, result };
  },
});

export const multiplyTool = tool({
  description: "Multiply two numbers together",
  parameters: z.object({
    a: z.number().describe("First number"),
    b: z.number().describe("Second number"),
  }),
  execute: async ({ a, b }) => {
    const result = a * b;
    return { operation: "multiplication", a, b, result };
  },
});

export const divideTool = tool({
  description: "Divide one number by another",
  parameters: z.object({
    a: z.number().describe("Dividend (number to be divided)"),
    b: z.number().describe("Divisor (number to divide by)"),
  }),
  execute: async ({ a, b }) => {
    if (b === 0) {
      return {
        operation: "division",
        a,
        b,
        error: "Cannot divide by zero",
      };
    }
    const result = a / b;
    return { operation: "division", a, b, result };
  },
});

export const calculatorTool = tool({
  description: MATH_DEMO_TOOL_DESCRIPTIONS.calculator,
  parameters: z.object({
    expression: z
      .string()
      .describe(MATH_DEMO_PARAMETER_DESCRIPTIONS.calculator.expression),
  }),
  execute: async ({ expression }) => {
    try {
      const result = evaluate(expression);

      if (typeof result !== "number" || isNaN(result) || !isFinite(result)) {
        throw new Error("Invalid calculation result");
      }

      return {
        expression,
        result,
      };
    } catch (error) {
      return {
        expression,
        error: `Unable to calculate this expression: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  },
});
