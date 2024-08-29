import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Input, Button } from '@chakra-ui/react';
import { Send } from 'lucide-react';
import { Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import '../styles/chat.css';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { Container } from '@chakra-ui/react'
export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(true);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    console.log('Model:', model);
  }, []);

  const addMessage = (message, sender) => {
    setMessages((prevMessages) => [...prevMessages, { text: message, sender }]);
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
    <Container maxW='container.sm'>
      <div className="chat-header">Chat Interface</div>
      <div className="chat-body" ref={chatContainerRef}>
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.sender}`}>
         <ReactMarkdown>
  {message.text}
</ReactMarkdown>
          </div>
        ))}
        {loading && (
          <Box padding='6' boxShadow='lg' bg='white' >
            <SkeletonCircle size='10' />
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
          </Box>
        )}
     
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
    </Container>

  );
}
