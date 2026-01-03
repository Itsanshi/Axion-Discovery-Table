import React, { memo } from 'react';
import { Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface QuickBuyButtonProps {
  amount: number;
  tokenTicker: string;
  onBuy?: () => void;
  disabled?: boolean;
  className?: string;
}

export const QuickBuyButton = memo<QuickBuyButtonProps>(({ 
  amount, 
  tokenTicker,
  onBuy,
  disabled = false,
  className 
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBuy?.();
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClick}
          disabled={disabled}
          className={cn(
            'h-7 px-2 gap-1.5 text-xs font-medium',
            'bg-primary/10 hover:bg-primary/20 text-primary',
            'border border-primary/20 hover:border-primary/40',
            'transition-all duration-200',
            'hover:shadow-glow-primary',
            className
          )}
        >
          <Zap className="h-3 w-3" />
          <span>{amount.toFixed(9)} SOL</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left" className="text-xs">
        Quick buy {amount} SOL of {tokenTicker}
      </TooltipContent>
    </Tooltip>
  );
});

QuickBuyButton.displayName = 'QuickBuyButton';
