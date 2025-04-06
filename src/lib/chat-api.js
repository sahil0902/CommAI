import { getAnswer as getAnswerFromAI } from '../assets/AI/ai.jsx';

// Re-export the AI implementation with our expected signature
export const getAnswer = (content, callback, setLoading) => {
  // The original getAnswer expects to call addMessage with 'bot' as the second parameter
  // But our implementation expects callback to handle the message
  const adaptedCallback = (message) => {
    callback(message);
  };
  
  // Call the actual AI implementation
  return getAnswerFromAI(content, adaptedCallback, setLoading);
}; 