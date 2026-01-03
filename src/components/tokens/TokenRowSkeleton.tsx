import React, { memo } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface TokenRowSkeletonProps {
  className?: string;
  variant?: 'default' | 'shimmer';
  style?: React.CSSProperties;
}

export const TokenRowSkeleton = memo<TokenRowSkeletonProps>(({ 
  className,
  variant = 'shimmer',
  style
}) => {
  const baseClasses = variant === 'shimmer' ? 'skeleton-shimmer' : '';
  
  return (
    <div 
      className={cn(
        'flex items-center gap-4 px-3 py-3 border-b border-table-border',
        className
      )}
      style={style}
    >
      {/* Avatar */}
      <Skeleton className={cn('h-10 w-10 rounded-lg', baseClasses)} />
      
      {/* Name & Ticker */}
      <div className="flex flex-col gap-1 min-w-[140px]">
        <Skeleton className={cn('h-4 w-20', baseClasses)} />
        <Skeleton className={cn('h-3 w-12', baseClasses)} />
      </div>
      
      {/* Social Links */}
      <div className="flex gap-1">
        <Skeleton className={cn('h-5 w-5 rounded', baseClasses)} />
        <Skeleton className={cn('h-5 w-5 rounded', baseClasses)} />
        <Skeleton className={cn('h-5 w-5 rounded', baseClasses)} />
      </div>
      
      {/* Stats */}
      <div className="flex gap-4 flex-1">
        <Skeleton className={cn('h-4 w-16', baseClasses)} />
        <Skeleton className={cn('h-4 w-12', baseClasses)} />
        <Skeleton className={cn('h-4 w-10', baseClasses)} />
      </div>
      
      {/* Price Changes */}
      <div className="flex gap-4">
        <Skeleton className={cn('h-4 w-12', baseClasses)} />
        <Skeleton className={cn('h-4 w-12', baseClasses)} />
        <Skeleton className={cn('h-4 w-10', baseClasses)} />
      </div>
      
      {/* Market Cap & Volume */}
      <div className="flex flex-col items-end gap-1 min-w-[80px]">
        <Skeleton className={cn('h-4 w-14', baseClasses)} />
        <Skeleton className={cn('h-3 w-10', baseClasses)} />
      </div>
      
      {/* Quick Buy */}
      <Skeleton className={cn('h-7 w-28 rounded-md', baseClasses)} />
    </div>
  );
});

TokenRowSkeleton.displayName = 'TokenRowSkeleton';

// Multiple skeletons for loading state
interface TokenTableSkeletonProps {
  rows?: number;
  className?: string;
}

export const TokenTableSkeleton = memo<TokenTableSkeletonProps>(({ 
  rows = 8,
  className 
}) => {
  return (
    <div className={cn('divide-y divide-table-border', className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <TokenRowSkeleton 
          key={i} 
          className={cn(
            'animate-fade-in opacity-0',
            `animation-delay-${(i % 3) * 100}`
          )}
          style={{ animationDelay: `${i * 50}ms` } as React.CSSProperties}
        />
      ))}
    </div>
  );
});

TokenTableSkeleton.displayName = 'TokenTableSkeleton';
