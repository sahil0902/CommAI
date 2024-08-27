import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Input, Button } from '@chakra-ui/react';
import { Send } from 'lucide-react';
import { Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import '../styles/chat.css';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
const api = import.meta.env.VITE_API_KEY;
const genAI = new GoogleGenerativeAI(api);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    console.log('Model:', model);
  }, []);

  const addMessage = (message, sender) => {
    setMessages((prevMessages) => [...prevMessages, { text: message, sender }]);
  };

  const getAnswer = async () => {
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

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const sendQuestion = () => {
    if (inputValue.trim() !== '') {
      addMessage(inputValue, 'user');
      setInputValue('');
      setLoading(true);
      getAnswer();
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

// Chat.js

return (
    <div className="chat-container">
      <div className="chat-header">Chat Interface</div>
      <div className="chat-body" ref={chatContainerRef}>
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.sender}`}>
         <ReactMarkdown
  options={{
    overrides: {
      a: {
        target: "_blank",
        rel: "noopener noreferrer",
      },
      code: ({ node, inline, className, ...props }) => (
        <code
          className={className}
          style={{
            backgroundColor: "#f0f0f0",
            padding: "2px 4px",
            borderRadius: "2px",
            fontSize: "14px",
            fontFamily: "monospace",
          }}
          {...props}
        />
      ),
      pre: ({ node, children, ...props }) => (
        <pre
          style={{
            backgroundColor: "#f0f0f0",
            padding: "8px",
            borderRadius: "4px",
            fontSize: "14px",
            fontFamily: "monospace",
            whiteSpace: "pre-wrap",
          }}
          {...props}
        >
          {children}
        </pre>
      ),
      blockquote: ({ node, children, ...props }) => (
        <blockquote
          style={{
            borderLeft: "4px solid #ccc",
            padding: "8px",
            fontSize: "16px",
            fontStyle: "italic",
          }}
          {...props}
        >
          {children}
        </blockquote>
      ),
      img: ({ node, ...props }) => (
        <img
          style={{
            maxWidth: "100%",
            height: "auto",
            borderRadius: "4px",
          }}
          {...props}
        />
      ),
      h1: ({ node, children, ...props }) => (
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "8px",
          }}
          {...props}
        >
          {children}
        </h1>
      ),
      h2: ({ node, children, ...props }) => (
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "8px",
          }}
          {...props}
        >
          {children}
        </h2>
      ),
      h3: ({ node, children, ...props }) => (
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            marginBottom: "8px",
          }}
          {...props}
        >
          {children}
        </h3>
      ),
      h4: ({ node, children, ...props }) => (
        <h4
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            marginBottom: "8px",
          }}
          {...props}
        >
          {children}
        </h4>
      ),
      h5: ({ node, children, ...props }) => (
        <h5
          style={{
            fontSize: "14px",
            fontWeight: "bold",
            marginBottom: "8px",
          }}
          {...props}
        >
          {children}
        </h5>
      ),
      h6: ({ node, children, ...props }) => (
        <h6
          style={{
            fontSize: "12px",
            fontWeight: "bold",
            marginBottom: "8px",
          }}
          {...props}
        >
          {children}
        </h6>
      ),
      ul: ({ node, children, ...props }) => (
        <ul
          style={{
            listStyle: "disc",
            paddingLeft: "20px",
          }}
          {...props}
        >
          {children}
        </ul>
      ),
      ol: ({ node, children, ...props }) => (
        <ol
          style={{
            listStyle: "decimal",
            paddingLeft: "20px",
          }}
          {...props}
        >
          {children}
        </ol>
      ),
    },
  }}
>
  {message.text}
</ReactMarkdown>
          </div>
        ))}
        {loading && (
          <Box padding='6' boxShadow='lg' bg='white' className="loading-skeleton">
            <SkeletonCircle size='10' />
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
          </Box>
        )}
      </div>
      <div className="chat-box">
        <Input
          value={inputValue}
          onChange={handleChange}
          placeholder="Type here..."
          className="input"
          onKeyPress={(e) => e.key === 'Enter' && sendQuestion()}
        />
        <Button
          onClick={sendQuestion}
          leftIcon={<Send />}
          variant="solid"
          colorScheme="blue"
        >
          Send
        </Button>
      </div>
    </div>
  );
}
