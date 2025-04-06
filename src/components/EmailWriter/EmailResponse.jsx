import React from 'react';
import { Copy, Edit } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEmailContext } from './EmailContext';
import Markdown from 'markdown-to-jsx';

export function EmailResponse() {
  const { 
    messages, 
    latestResponse, 
    loading, 
    copyToClipboard, 
    modifyFurther 
  } = useEmailContext();

  if (messages.length === 0) {
    return (
      <Card className="h-full flex flex-col justify-center items-center p-8 bg-gradient-to-b from-secondary/5 to-primary/5 border-dashed border-2 border-muted rounded-xl shadow-sm">
        <div className="text-center space-y-3">
          <p className="text-muted-foreground text-center text-lg">
            Your generated content will appear here after you submit your request.
          </p>
          <div className="text-xs text-muted-foreground/70 max-w-xs mx-auto">
            Try writing a message and selecting an action from the dropdown menu on the left
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col shadow-md hover:shadow-lg transition-all border-secondary/10 rounded-xl overflow-hidden">
      <CardHeader className="pb-3 border-b bg-secondary/5">
        <CardTitle className="text-lg font-semibold">Generated Content</CardTitle>
      </CardHeader>

      <CardContent className="flex-grow overflow-y-auto space-y-5 py-5">
        {messages.map((message, index) => (
          <div key={index} className={`${
            message.sender === 'user' 
              ? 'bg-primary/10 border-l-4 border-primary shadow-sm' 
              : 'bg-secondary/20 border-l-4 border-secondary shadow-sm'
            } p-5 rounded-md transition-all hover:shadow-md`}
          >
            <div className="mb-2 flex items-center">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                message.sender === 'user' 
                  ? 'bg-primary/20 text-primary-foreground' 
                  : 'bg-secondary/30 text-secondary-foreground'
              }`}>
                {message.sender === 'user' ? 'Your input' : `AI response (${message.action})`}
              </span>
            </div>
            <div className="prose prose-sm max-w-none dark:prose-invert">
              {message.sender === 'ai' ? (
                <Markdown>{message.text}</Markdown>
              ) : (
                <p>{message.text}</p>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="p-5 bg-secondary/10 rounded-md border border-secondary/20 shadow-sm">
            <div className="flex space-x-2 mb-3">
              <div className="h-3 w-3 rounded-full bg-secondary/40 animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="h-3 w-3 rounded-full bg-secondary/40 animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="h-3 w-3 rounded-full bg-secondary/40 animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-secondary/20 rounded w-3/4"></div>
              <div className="h-2 bg-secondary/20 rounded"></div>
              <div className="h-2 bg-secondary/20 rounded w-1/2"></div>
            </div>
          </div>
        )}
      </CardContent>

      {latestResponse && (
        <CardFooter className="flex gap-3 border-t py-4 bg-secondary/5">
          <Button 
            onClick={copyToClipboard} 
            variant="outline" 
            className="flex-1 shadow-sm hover:shadow-md transition-all border-secondary/20"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          
          <Button 
            onClick={modifyFurther} 
            variant="secondary" 
            className="flex-1 shadow-sm hover:shadow-md transition-all bg-gradient-to-r from-secondary to-secondary/80"
          >
            <Edit className="h-4 w-4 mr-2" />
            Modify
          </Button>
        </CardFooter>
      )}
    </Card>
  );
} 