import React, { memo } from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number; // 0-100
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md';
  variant?: 'default' | 'success' | 'warning';
}

const sizeClasses = {
  sm: 'h-1',
  md: 'h-1.5',
};

const variantClasses = {
  default: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
};

export const ProgressBar = memo<ProgressBarProps>(({ 
  value, 
  className,
  showLabel = false,
  size = 'sm',
  variant = 'default'
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));
  
  const dynamicVariant = clampedValue >= 90 ? 'success' : clampedValue >= 70 ? 'warning' : variant;
  
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div 
        className={cn(
          'flex-1 rounded-full bg-progress-bg overflow-hidden',
          sizeClasses[size]
        )}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            variantClasses[dynamicVariant],
            clampedValue >= 90 && 'shadow-glow-success'
          )}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-medium text-foreground-secondary min-w-[3ch] text-right">
          {Math.round(clampedValue)}%
        </span>
      )}
    </div>
  );
});

ProgressBar.displayName = 'ProgressBar';
