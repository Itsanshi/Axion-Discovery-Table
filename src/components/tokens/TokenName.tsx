import React, { memo } from 'react';
import { CheckCircle2, AlertCircle, Copy, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface TokenNameProps {
  name: string;
  ticker: string;
  address: string;
  isVerified?: boolean;
  age: string;
  className?: string;
}

export const TokenName = memo<TokenNameProps>(({ 
  name, 
  ticker, 
  address,
  isVerified = false,
  age,
  className 
}) => {
  const truncatedAddress = `${address.slice(0, 4)}...${address.slice(-4)}`;

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    toast.success('Address copied to clipboard');
  };

  return (
    <div className={cn('flex flex-col min-w-0', className)}>
      <div className="flex items-center gap-1.5">
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-1 min-w-0 group">
              <span className="font-semibold text-foreground truncate max-w-[120px] group-hover:text-primary transition-colors">
                {ticker}
              </span>
              <span className="text-foreground-dim text-sm truncate max-w-[100px]">
                {name}
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent 
            side="right" 
            align="start" 
            className="w-64 p-3 bg-popover border-border"
          >
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-foreground">{name}</h4>
                <p className="text-sm text-foreground-secondary">${ticker}</p>
              </div>
              <div className="flex items-center justify-between p-2 rounded-md bg-background-surface">
                <code className="text-xs text-foreground-muted font-mono">
                  {truncatedAddress}
                </code>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyAddress}
                    className="h-6 w-6 p-0"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="h-6 w-6 p-0"
                  >
                    <a 
                      href={`https://solscan.io/token/${address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        {isVerified && (
          <Tooltip>
            <TooltipTrigger>
              <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs">
              Verified token
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <span className="text-xs text-foreground-dim">{age}</span>
    </div>
  );
});

TokenName.displayName = 'TokenName';
