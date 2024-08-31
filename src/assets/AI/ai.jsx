import { GoogleGenerativeAI } from "@google/generative-ai";
import 'regenerator-runtime/runtime';
const api = import.meta.env.VITE_API_KEY;
const genAI = new GoogleGenerativeAI(api);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const preprocessEmailContent = (content) => {
    // Example preprocessing: trim whitespace, remove special characters, etc.
    return content.trim().replace(/[\r\n]+/g, ' ');
};

const enhancePrompt = (action, content) => {
    const formattedAction = action.toLowerCase();
    return `As an expert in crafting and managing email and text message communications, your role is to ${formattedAction} the following content: "${content}". Please ensure that you only proceed if the content is an email or text. For any other types of requests, please note that my assistance is limited to emails and text messages only.`;
};


export const getAnswer = async (inputValue, addMessage, setLoading) => {
    try {
        if (typeof model.generateContent !== 'function') {
            throw new Error('generateContent method is not available on the model');
        }
        const result = await model.generateContent(inputValue);
        const response = result.response;
        const text = await response.text();
        addMessage(text, 'bot');
    } catch (error) {
        console.error('Error generating answer:', error);
        addMessage('Sorry, something went wrong. Please try again.', 'bot');
    } finally {
        setLoading(false);
    }
};

export const getEmail = async (inputValue, addMessage, action, setLoading) => {
    try {
        if (typeof model.generateContent !== 'function') {
            throw new Error('generateContent method is not available on the model');
        }
        const cleanedContent = preprocessEmailContent(inputValue);
        const prompt = enhancePrompt(action, cleanedContent);
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = await response.text();
        addMessage(text, 'bot');
    } catch (error) {
        console.error('Error generating answer:', error);
        addMessage('Sorry, something went wrong. Please try again.', 'bot');
    } finally {
        setLoading(false);
    }
};