import { getEmail as getEmailFromAI } from '../assets/AI/ai.jsx';

// Re-export the AI implementation with our expected signature
export const getEmail = (content, callback, action, setLoading) => {
  // The original getEmail expects to call addMessage with 'bot' as the second parameter
  // But our implementation expects callback to handle the message with no second parameter
  const adaptedCallback = (message) => {
    callback(message);
  };
  
  // Call the actual AI implementation
  return getEmailFromAI(content, adaptedCallback, action, setLoading);
}; 