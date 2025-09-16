# **App Name**: Metric IDE

## Core Features:

- Chat Interface: Displays a chat interface with a message list and user input area.
- LLM Interaction: Send user input to the backend for LLM processing and receive streamed answers and context.
- Metrics Display: Display Faithfulness, Answer Relevance, and Context Relevance scores for each LLM response using colored progress bars/gauges and explanatory text.
- Detailed Metric Evidence: Show per-statement faithfulness verdicts, generated questions with similarity scores, and extracted context sentences in an expandable details panel or separate routes.
- Routing: Clicking on each metric card will lead to different routes, allowing the user to see underlying evidence for the LLM response.
- LLM Answer Quality Enhancement Tool: LLM analyzes user prompts and, only when required, rephrases the prompt for enhanced answer quality and faithfulness using a Chain of Thought (CoT) approach.

## Style Guidelines:

- Background color: Dark gray (#282c34) for an IDE-like feel.
- Primary color: Muted blue (#61afef) for highlighting important elements.
- Accent color: Subtle orange (#c678dd) for interactive elements and progress bars. Progress bars use a gradient from red (#e06c75) to yellow (#e5c07b) to green (#98c379).
- Font: 'Space Grotesk', a sans-serif, for a contemporary, techy look suitable for the interface.
- Minimal, line-based icons to represent different metrics and actions.
- Split-pane layout with chat on the left and metrics on the right.  Use subtle borders and spacing for clarity.
- Subtle animations for loading states and metric updates.