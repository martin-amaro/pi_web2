import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';
import React from 'react'

export const Loading = ({className = ""} : {className?: string}) => {
  return (
    <div className={cn("w-full min-h-screen flex items-center justify-center", className)}>
      <LoaderCircle className="w-8 h-8 text-blue-600 animate-spin" />
    </div>
  );
}
