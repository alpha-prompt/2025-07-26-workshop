# PDF Demo Variants

## 🔧 Variant 1: Hyper-Focused Data Extraction

**Learning Goal**: See how specificity affects extraction quality

```typescript
export const INVESTMENT_MEMO_EXCEL_PROMPT = `
  Extract ONLY these specific metrics from the investment memo:

  - Revenue (current year)
  - Revenue growth rate (% YoY)
  - Valuation (latest round)
  - Employees count
  - Funding raised to date

  Create exactly 5 rows in Excel. If any metric is missing, use "Not Found" as the value.

  Do not extract any other information. Focus solely on these five metrics.
`
```

**Why try this**: You'll see how ultra-specific instructions can improve extraction accuracy for targeted data, but might miss other valuable information in the document.

**What to expect**: Very clean, focused output with exactly the requested metrics, but potentially missing other important financial data that could be relevant.

## 🔧 Variant 2: Creative Interpretation Mode

**Learning Goal**: Understand how AI fills gaps when instructions are vague

```typescript
export const STRATEGY_MEMO_MARKDOWN_PROMPT = `
  Turn this strategy memo into an engaging story about the company's journey.

  Make it interesting and narrative-driven. Feel free to:
  - Add dramatic flair to the business challenges
  - Create compelling character descriptions for the leadership team
  - Use metaphors and analogies to explain the business model
  - Make predictions about future success
  - Add your own analysis and opinions

  Make it read like a business magazine feature article.
`
```

**Why try this**: You'll see how AI handles creative vs. analytical tasks, and how it interprets "creative license" when working with factual documents.

**What to expect**: A more engaging but potentially less accurate representation of the document, showing the trade-off between creativity and factual precision.

## 🔧 Variant 3: Paranoid Fact-Checker

**Learning Goal**: See how excessive verification affects processing

```typescript
export const PDF_SYSTEM_PROMPTS = {
  excel: `
    You are an extremely cautious financial document analyzer with trust issues.

    VERIFICATION REQUIREMENTS:
    - Question every number you see - could it be a typo?
    - Cross-reference all data points within the document
    - Flag any inconsistencies or suspicious figures
    - Add confidence levels (High/Medium/Low) for each extracted metric
    - Include warnings about potentially unreliable data
    - Note if numbers don't add up or seem unrealistic

    Never extract data without expressing your confidence level and concerns.
  `
}
```

**Why try this**: You'll see how adding verification layers affects both accuracy and usability, learning about the balance between skepticism and productivity.

**What to expect**: More accurate but slower processing, with lots of caveats and warnings that might overwhelm users but could catch important errors.

## 🔧 Variant 4: Speed Over Accuracy

**Learning Goal**: Understand the accuracy vs. speed trade-off

```typescript
export const INVESTMENT_MEMO_MARKDOWN_PROMPT = `
  Quickly scan this document and give me the key highlights in bullet points.

  Don't spend time on detailed analysis - just hit the main points:
  - What does the company do?
  - How much money did they raise?
  - Are they growing?
  - Should we invest?

  Keep it under 100 words total. Speed is more important than completeness.
`
```

**Why try this**: You'll see how AI performs when optimizing for speed over thoroughness, showing the trade-offs in business decision-making scenarios.

**What to expect**: Fast, high-level insights that might miss nuanced details but give you a quick decision framework.

## 🔧 Variant 5: Multi-Perspective Analysis

**Learning Goal**: See how different stakeholder views affect information extraction

```typescript
export const PDF_PROMPT_TEMPLATES = [
  {
    title: "CEO Perspective → Executive Summary",
    prompt: "Extract information a CEO would care about: strategic vision, market opportunity, competitive advantage, and growth plans."
  },
  {
    title: "CFO Perspective → Financial Analysis",
    prompt: "Extract information a CFO would focus on: revenue models, unit economics, cash flow, and financial projections."
  },
  {
    title: "CTO Perspective → Technical Assessment",
    prompt: "Extract information a CTO would evaluate: technology stack, scalability, technical risks, and development roadmap."
  },
  {
    title: "Investor Perspective → Due Diligence",
    prompt: "Extract information an investor would analyze: market size, traction metrics, team experience, and exit potential."
  }
]
```

**Why try this**: You'll see how the same document reveals different insights depending on whose perspective you take, demonstrating the importance of stakeholder-aware AI systems.

**What to expect**: Four completely different analyses of the same document, each highlighting information most relevant to that role's decision-making needs.
