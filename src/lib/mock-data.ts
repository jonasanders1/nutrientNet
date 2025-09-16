import { Message } from './types';

const mockDetails1 = {
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

const mockDetails2 = {
  statements: [
    { text: "Lentils are a good source of protein and fiber.", supported: true, explanation: "Supported by the context." },
    { text: "Fiber helps with digestion.", supported: true, explanation: "Supported by the context." },
    { text: "Quinoa is a complete protein.", supported: true, explanation: "Supported by the context." },
    { text: "All fats are bad for you.", supported: false, explanation: "This is a harmful generalization not supported by nuanced nutritional science." },
  ],
  generatedQuestions: [
    { q: "What are some plant-based protein sources?", sim: 0.95 },
    { q: "Why is fiber important?", sim: 0.88 },
    { q: "Is quinoa healthy?", sim: 0.91 },
  ],
  extractedContextSentences: [
    "For plant-based diets, lentils are an excellent source of protein and fiber, aiding in digestion.",
    "Quinoa is a rare plant-based complete protein, containing all essential amino acids.",
    "Healthy fats from avocados and nuts are crucial for brain function."
  ],
  context: [
    "For plant-based diets, lentils are an excellent source of protein and fiber, aiding in digestion.",
    "Quinoa is a rare plant-based complete protein, containing all essential amino acids.",
    "Healthy fats from avocados and nuts are crucial for brain function.",
    "Simple sugars should be consumed in moderation.",
  ],
};

const mockDetails3 = {
  statements: [
    { text: "Omega-3 fatty acids are good for brain health.", supported: true, explanation: "Supported by the context." },
    { text: "You can get Omega-3s from flax seeds.", supported: true, explanation: "Supported by the context." },
    { text: "Antioxidants from berries can help with cellular repair.", supported: true, explanation: "Supported by the context." },
    { text: "Eating a single blueberry will make you a genius.", supported: false, explanation: "This is a significant overstatement and not supported by science." },
  ],
  generatedQuestions: [
    { q: "What foods are good for my brain?", sim: 0.96 },
    { q: "Where do I find antioxidants?", sim: 0.90 },
    { q: "What are the benefits of Omega-3s?", sim: 0.93 },
  ],
  extractedContextSentences: [
    "For brain health, focus on Omega-3 fatty acids, which you can find in flax seeds.",
    "Antioxidants, found in berries, help protect your brain from oxidative stress.",
    "Turmeric has anti-inflammatory properties that can support cognitive function."
  ],
  context: [
    "For brain health, focus on Omega-3 fatty acids, which you can find in flax seeds.",
    "Antioxidants, found in berries, help protect your brain from oxidative stress.",
    "Complex carbohydrates provide a steady supply of energy to the brain.",
    "Turmeric has anti-inflammatory properties that can support cognitive function.",
    "Hydration is also key for optimal brain performance.",
  ],
};


const userMessage1: Message = {
  id: 'user-1',
  role: 'user',
  content: "What's a good diet for high energy and iron levels?",
  timestamp: new Date(Date.now() - 60000 * 15).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

const assistantMessage1: Message = {
  id: 'assistant-1',
  role: 'assistant',
  content: "For high energy and iron levels, a balanced diet is key. B-vitamins are crucial for energy metabolism, and you can find them in whole grains and legumes. Spinach is a great source of iron, and pairing it with foods rich in Vitamin C, like citrus fruits, will enhance iron absorption.",
  timestamp: new Date(Date.now() - 60000 * 13).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  metrics: {
    faithfulness: 0.75,
    answerRelevance: 0.91,
    contextRelevance: 0.60,
    details: mockDetails1,
  },
};

const userMessage2: Message = {
    id: 'user-2',
    role: 'user',
    content: "That's helpful! What about some good plant-based protein options?",
    timestamp: new Date(Date.now() - 60000 * 10).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

const assistantMessage2: Message = {
    id: 'assistant-2',
    role: 'assistant',
    content: "Excellent question. For plant-based proteins, lentils and quinoa are fantastic choices. Lentils are rich in both protein and fiber. Quinoa is special because it's a complete protein, meaning it has all nine essential amino acids your body needs.",
    timestamp: new Date(Date.now() - 60000 * 8).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    metrics: {
        faithfulness: 0.98,
        answerRelevance: 0.95,
        contextRelevance: 0.85,
        details: mockDetails2,
    },
};

const userMessage3: Message = {
    id: 'user-3',
    role: 'user',
    content: "Great, last question. Any recommendations for foods that boost brain function?",
    timestamp: new Date(Date.now() - 60000 * 5).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

const assistantMessage3: Message = {
    id: 'assistant-3',
    role: 'assistant',
    content: "Absolutely. To boost brain function, incorporate foods rich in Omega-3 fatty acids, like flax seeds. Berries are packed with antioxidants that protect the brain, and spices like turmeric have anti-inflammatory benefits that support cognitive health.",
    timestamp: new Date(Date.now() - 60000 * 3).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    metrics: {
        faithfulness: 0.88,
        answerRelevance: 0.94,
        contextRelevance: 0.78,
        details: mockDetails3,
    },
};

export const MOCK_CONVERSATION: Message[] = [
  userMessage1,
  assistantMessage1,
  userMessage2,
  assistantMessage2,
  userMessage3,
  assistantMessage3,
];

// Re-exporting these for other parts of the app that might use them directly
export const MOCK_USER_MESSAGE = userMessage3;
export const MOCK_ASSISTANT_MESSAGE = assistantMessage3;
