
import React from 'react';
import { Database } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Database className="h-6 w-6 text-primary" />
      <span className="font-semibold text-xl">KnowledgeHub</span>
    </div>
  );
};

export default Logo;
