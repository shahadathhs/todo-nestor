'use client'

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

interface ErrorProps {
  error: Error;        
  reset: () => void;  
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h2 className='p-10 text-4xl font-bold '>An Error occurred!</h2>
      <Button
        onClick={reset}
      >
        Try again
      </Button>
    </div>
  );
}