'use client';

import React, { useState } from 'react';

import { SendHorizonal } from 'lucide-react'; // Smile for emoji, Mic for voice

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function ChatInput() {
  const [message, setMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('Sending message:', message);
      // Add logic to send message to backend/state management
      setMessage('');
    }
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center space-x-2"
    >
      {/* <Button variant="ghost" size="icon" type="button" className="text-gray-500 dark:text-gray-400">
        <Smile className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" type="button" className="text-gray-500 dark:text-gray-400">
        <Paperclip className="h-5 w-5" />
      </Button> */}
      <Input
        type="text"
        placeholder="Write a message for John Doe" // Placeholder could be dynamic
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 border-gray-200 dark:border-gray-600 focus:border-blue-500"
        autoComplete="off"
      />
      {/* <Button variant="ghost" size="icon" type="button" className="text-gray-500 dark:text-gray-400">
        <Mic className="h-5 w-5" />
      </Button> */}
      <Button
        type="submit"
        size="icon"
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
      >
        <SendHorizonal className="h-5 w-5" />
      </Button>
    </form>
  );
}
