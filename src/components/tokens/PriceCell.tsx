import React, { memo, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { formatMarketCap, formatVolume } from '@/lib/mockData';

interface PriceCellProps {
  value: number;
  type: 'marketCap' | 'volume' | 'percentage' | 'holders';
  flash?: 'up' | 'down' | null;
  previousValue?: number;
  className?: string;
}

export const PriceCell = memo<PriceCellProps>(({ 
  value, 
  type, 
  flash,
  className 
}) => {
  const formattedValue = useMemo(() => {
    switch (type) {
      case 'marketCap':
        return formatMarketCap(value);
      case 'volume':
        return formatVolume(value);
      case 'percentage':
        const sign = value >= 0 ? '+' : '';
        return `${sign}${value.toFixed(0)}%`;
      case 'holders':
        if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
        return value.toString();
      default:
        return value.toString();
    }
  }, [value, type]);

  const colorClass = useMemo(() => {
    if (type === 'percentage') {
      if (value > 0) return 'text-success';
      if (value < 0) return 'text-destructive';
      return 'text-foreground-muted';
    }
    return 'text-foreground';
  }, [type, value]);

  return (
    <span
      className={cn(
        'font-mono text-sm font-medium transition-colors duration-200',
        colorClass,
        flash === 'up' && 'animate-flash-green',
        flash === 'down' && 'animate-flash-red',
        className
      )}
    >
      {formattedValue}
    </span>
  );
});

PriceCell.displayName = 'PriceCell';

// Label + Value variant for structured display
interface LabeledPriceCellProps extends PriceCellProps {
  label: string;
  labelClassName?: string;
}

export const LabeledPriceCell = memo<LabeledPriceCellProps>(({
  label,
  labelClassName,
  ...priceProps
}) => {
  return (
    <div className="flex flex-col">
      <span className={cn('text-[10px] uppercase tracking-wider text-foreground-dim', labelClassName)}>
        {label}
      </span>
      <PriceCell {...priceProps} />
    </div>
  );
});

LabeledPriceCell.displayName = 'LabeledPriceCell';
