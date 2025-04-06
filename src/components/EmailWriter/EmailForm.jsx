import React, { useState, useEffect } from 'react';
import { Mic, MicOff, RefreshCw, Send } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useEmailContext } from './EmailContext';

export function EmailForm() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const {
    emailContent,
    setEmailContent,
    action,
    setAction,
    handleSubmit,
    resetForm,
  } = useEmailContext();

  useEffect(() => {
    if (transcript) {
      setEmailContent(transcript);
    }
  }, [transcript, setEmailContent]);

  const actions = [
    "Make it formal",
    "Make it casual",
    "Make it shorter",
    "Make it longer",
    "Improve grammar",
    "Improve clarity",
    "Add more detail",
    "Make it more persuasive",
    "Make it more friendly",
    "Translate to Spanish",
  ];

  return (
    <Card className="h-full flex flex-col shadow-md hover:shadow-lg transition-all border-primary/10 rounded-xl overflow-hidden">
      <CardContent className="pt-6 flex-grow flex flex-col">
        <div className="flex justify-between items-center mb-5 pb-2 border-b">
          <h2 className="text-lg font-semibold">Compose Message</h2>
          <Button
            variant="ghost"
            size="sm" 
            onClick={resetForm}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>

        <Textarea
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          placeholder="Enter your message or email content here..."
          className="flex-grow resize-none min-h-[220px] focus-visible:ring-primary/40 border-primary/10 text-base p-4"
        />

        <div className="mt-5 flex flex-col gap-3">
          <div className="flex gap-2">
            <DropdownMenu 
              triggerContent={action || "Choose Action"}
              className="w-full shadow-sm hover:shadow transition-all"
            >
              {actions.map((actionItem) => (
                <DropdownMenuItem 
                  key={actionItem}
                  onClick={() => setAction(actionItem)}
                  className="hover:bg-primary/5 cursor-pointer"
                >
                  {actionItem}
                </DropdownMenuItem>
              ))}
            </DropdownMenu>
            
            <Button
              onClick={
                listening 
                  ? SpeechRecognition.stopListening 
                  : SpeechRecognition.startListening
              }
              variant={listening ? "destructive" : "outline"}
              size="icon"
              className="shadow-sm hover:shadow-md transition-all"
            >
              {listening ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t pt-5 pb-5 bg-primary/5">
        <Button 
          onClick={handleSubmit} 
          className="w-full shadow-md hover:shadow-lg transition-all bg-gradient-to-r from-primary to-primary/80"
          disabled={!emailContent.trim()}
        >
          <Send className="h-4 w-4 mr-2" />
          Generate Content
        </Button>
      </CardFooter>
    </Card>
  );
} 