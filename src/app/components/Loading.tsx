import { LoaderCircle } from 'lucide-react';
import React from 'react'

export const Loading = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <LoaderCircle className="w-8 h-8 text-blue-600 animate-spin" />
    </div>
  );
}
