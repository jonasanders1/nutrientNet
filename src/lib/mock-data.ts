import { Message } from './types';

const mockDetails = {
  statements: [
    { text: "B-vitamins are crucial for energy metabolism.", supported: true, explanation: "Supported by sentence 1 of the context." },
    { text: "Spinach is a good source of iron.", supported: true, explanation: "Supported by sentence 3 of the context." },
    { text: "Vitamin C helps with iron absorption.", supported: true, explanation: "Supported by sentence 4 of the context." },
    { text: "You should eat 5kg of spinach daily.", supported: false, explanation: "The context does not specify a quantity, this is an exaggeration." },
  ],
  generatedQuestions: [
    { q: "What are good sources of B-vitamins and iron?", sim: 0.98 },
    { q: "How can I improve iron absorption?", sim: 0.92 },
    { q: "Tell me about energy metabolism.", sim: 0.85 },
  ],
  extractedContextSentences: [
    "A balanced diet includes a variety of nutrients. B-vitamins, found in whole grains and legumes, are essential for energy metabolism.",
    "Iron is important for oxygen transport, and sources include spinach and red meat.",
    "Vitamin C, found in citrus fruits, enhances iron absorption."
  ],
  context: [
    "A balanced diet includes a variety of nutrients. B-vitamins, found in whole grains and legumes, are essential for energy metabolism.",
    "The recommended daily intake of water is about 8 glasses.",
    "Iron is important for oxygen transport, and sources include spinach and red meat.",
    "Vitamin C, found in citrus fruits, enhances iron absorption.",
    "Proteins are the building blocks of the body."
  ],
};

export const MOCK_USER_MESSAGE: Message = {
  id: 'user-1',
  role: 'user',
  content: "What's a good diet for high energy and iron levels?",
  timestamp: new Date(Date.now() - 60000 * 5).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

export const MOCK_ASSISTANT_MESSAGE: Message = {
  id: 'assistant-1',
  role: 'assistant',
  content: "For high energy and iron levels, a balanced diet is key. B-vitamins are crucial for energy metabolism, and you can find them in whole grains and legumes. Spinach is a great source of iron, and pairing it with foods rich in Vitamin C, like citrus fruits, will enhance iron absorption.",
  timestamp: new Date(Date.now() - 60000 * 4).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  metrics: {
    faithfulness: 0.75,
    answerRelevance: 0.91,
    contextRelevance: 0.60,
    details: mockDetails,
  },
};

export const MOCK_CONVERSATION: Message[] = [
  MOCK_USER_MESSAGE,
  MOCK_ASSISTANT_MESSAGE,
];
