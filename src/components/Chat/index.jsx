import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { getAnswer } from '@/lib/chat-api';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

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
      
      // Call the AI API
      getAnswer(
        inputValue,
        (message) => addMessage(message, 'ai'),
        setLoading
      );
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="container mx-auto max-w-3xl p-4">
      <div className="flex flex-col h-[85vh] bg-card rounded-xl shadow-md border">
        <div className="text-xl font-bold py-4 text-center border-b mb-4 bg-primary/5 rounded-t-xl">
          Chat Interface
        </div>
        <div 
          className="flex-1 overflow-y-auto space-y-4 mb-4 px-4 py-2 scroll-smooth"
          ref={chatContainerRef}
        >
          {messages.map((message, index) => (
            <Card 
              key={index} 
              className={`${
                message.sender === 'user' 
                  ? 'bg-primary/10 ml-auto border-primary/20' 
                  : 'bg-secondary/30 border-secondary/20'
              } max-w-[80%] shadow-sm transition-all duration-200 hover:shadow-md`}
            >
              <CardContent className="p-4">
                <ReactMarkdown className="prose prose-sm dark:prose-invert max-w-none">
                  {message.text}
                </ReactMarkdown>
              </CardContent>
            </Card>
          ))}
          {loading && (
            <Card className="bg-secondary/20 max-w-[80%] overflow-hidden">
              <CardContent className="p-4">
                <div className="flex space-x-2">
                  <div className="h-3 w-3 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="h-3 w-3 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="h-3 w-3 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        <div className="flex gap-2 p-4 border-t bg-primary/5 rounded-b-xl">
          <Textarea
            value={inputValue}
            onChange={handleChange}
            placeholder="Type here..."
            className="resize-none min-h-12 focus-visible:ring-primary/70"
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendQuestion())}
          />
          <Button
            onClick={sendQuestion}
            className="shrink-0 shadow-md hover:shadow-lg transition-all"
            size="icon"
            disabled={loading || inputValue.trim() === ''}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
} 