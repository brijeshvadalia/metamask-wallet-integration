'use client';

import React, { useState } from 'react';
import { Card, CardContent } from './Card';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function AnimatedCard({ children, className = '', hover = true, glow = false }: AnimatedCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        relative transition-all duration-300 ease-out
        ${hover ? 'transform hover:scale-105' : ''}
        ${glow ? 'hover:shadow-2xl' : 'hover:shadow-xl'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {glow && isHovered && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl blur-xl opacity-30 -z-10" />
      )}
      <Card className={className}>
        <CardContent className="relative overflow-hidden">
          {children}
          {isHovered && (
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
