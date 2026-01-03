import React, { memo } from 'react';
import { Users, ArrowUpDown, MessageSquare, TrendingUp, TrendingDown, Wallet, Target, Crosshair } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { formatHolders } from '@/lib/mockData';

interface StatBadgeProps {
  type: 'holders' | 'transactions' | 'replies' | 'devHolding' | 'topHolders' | 'snipers';
  value: number;
  className?: string;
}

const statConfig = {
  holders: {
    icon: Users,
    label: 'Holders',
    format: (v: number) => formatHolders(v),
    colorClass: 'text-foreground-secondary',
  },
  transactions: {
    icon: ArrowUpDown,
    label: 'Transactions',
    format: (v: number) => v.toString(),
    colorClass: 'text-foreground-secondary',
  },
  replies: {
    icon: MessageSquare,
    label: 'Replies',
    format: (v: number) => v.toString(),
    colorClass: 'text-foreground-secondary',
  },
  devHolding: {
    icon: Wallet,
    label: 'Dev Holding',
    format: (v: number) => `${v.toFixed(1)}%`,
    colorClass: (v: number) => v > 5 ? 'text-warning' : 'text-foreground-secondary',
  },
  topHolders: {
    icon: Target,
    label: 'Top 10 Holders',
    format: (v: number) => `${v.toFixed(0)}%`,
    colorClass: (v: number) => v > 30 ? 'text-destructive' : 'text-foreground-secondary',
  },
  snipers: {
    icon: Crosshair,
    label: 'Snipers',
    format: (v: number) => `${v.toFixed(0)}%`,
    colorClass: (v: number) => v > 20 ? 'text-warning' : 'text-foreground-secondary',
  },
};

export const StatBadge = memo<StatBadgeProps>(({ type, value, className }) => {
  const config = statConfig[type];
  const Icon = config.icon;
  const colorClass = typeof config.colorClass === 'function' 
    ? config.colorClass(value) 
    : config.colorClass;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div 
          className={cn(
            'inline-flex items-center gap-1 text-xs',
            colorClass,
            className
          )}
        >
          <Icon className="h-3 w-3" />
          <span className="font-medium">{config.format(value)}</span>
        </div>
      </TooltipTrigger>
      <TooltipContent side="top" className="text-xs">
        {config.label}: {config.format(value)}
      </TooltipContent>
    </Tooltip>
  );
});

StatBadge.displayName = 'StatBadge';

// Grouped stats component
interface TokenStatsProps {
  holders: number;
  transactions: number;
  replies: number;
  className?: string;
}

export const TokenStats = memo<TokenStatsProps>(({ 
  holders, 
  transactions, 
  replies,
  className 
}) => {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <StatBadge type="holders" value={holders} />
      <StatBadge type="transactions" value={transactions} />
      {replies > 0 && <StatBadge type="replies" value={replies} />}
    </div>
  );
});

TokenStats.displayName = 'TokenStats';
