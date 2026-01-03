import React, { memo } from 'react';
import { cn } from '@/lib/utils';

interface TokenAvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  hasStatus?: boolean;
  isNew?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
};

export const TokenAvatar = memo<TokenAvatarProps>(({ 
  src, 
  alt, 
  size = 'md',
  hasStatus = false,
  isNew = false,
  className 
}) => {
  return (
    <div className={cn('relative flex-shrink-0', className)}>
      <div 
        className={cn(
          sizeClasses[size],
          'rounded-lg overflow-hidden bg-background-surface ring-1 ring-border/50',
          'transition-transform duration-150 hover:scale-105'
        )}
      >
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/shapes/svg?seed=${alt}`;
          }}
        />
      </div>
      {hasStatus && (
        <div 
          className={cn(
            'absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background',
            isNew ? 'bg-success animate-pulse' : 'bg-primary'
          )}
        />
      )}
    </div>
  );
});

TokenAvatar.displayName = 'TokenAvatar';
