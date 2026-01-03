import React, { memo, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Token } from '@/types/token';
import { TokenAvatar } from './TokenAvatar';
import { TokenName } from './TokenName';
import { SocialLinks } from './SocialLinks';
import { TokenStats } from './StatBadge';
import { PriceCell } from './PriceCell';
import { ProgressBar } from './ProgressBar';
import { QuickBuyButton } from './QuickBuyButton';
import { formatMarketCap, formatVolume } from '@/lib/mockData';
import { useAppSelector } from '@/store/hooks';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface TokenRowProps {
  token: Token;
  showProgress?: boolean;
  onClick?: (token: Token) => void;
  className?: string;
}

export const TokenRow = memo<TokenRowProps>(({ 
  token, 
  showProgress = false,
  onClick,
  className 
}) => {
  const priceFlashes = useAppSelector(state => state.tokens.priceFlashes);
  
  const marketCapFlash = priceFlashes[`${token.id}-marketCap`]?.direction || null;
  const volumeFlash = priceFlashes[`${token.id}-volume`]?.direction || null;
  const priceChangeFlash = priceFlashes[`${token.id}-priceChange5m`]?.direction || null;

  const handleClick = useCallback(() => {
    onClick?.(token);
  }, [onClick, token]);

  const handleQuickBuy = useCallback(() => {
    toast.success(`Quick buy ${token.quickBuyAmount} SOL of ${token.ticker}`);
  }, [token.quickBuyAmount, token.ticker]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'flex items-center gap-3 px-3 py-2.5 cursor-pointer',
        'border-b border-table-border',
        'transition-colors duration-150',
        'hover:bg-table-row-hover',
        className
      )}
      onClick={handleClick}
    >
      {/* Token Avatar */}
      <TokenAvatar 
        src={token.imageUrl} 
        alt={token.name}
        hasStatus
        isNew={token.age.includes('s') || token.age === '1m'}
      />

      {/* Token Name & Age */}
      <TokenName
        name={token.name}
        ticker={token.ticker}
        address={token.address}
        isVerified={token.isVerified}
        age={token.age}
        className="min-w-[130px]"
      />

      {/* Social Links */}
      <SocialLinks
        twitter={token.socials.twitter}
        website={token.socials.website}
        telegram={token.socials.telegram}
        discord={token.socials.discord}
        className="min-w-[70px]"
      />

      {/* Token Stats */}
      <TokenStats
        holders={token.holders}
        transactions={token.transactions}
        replies={token.replies}
        className="min-w-[140px]"
      />

      {/* Price Changes */}
      <div className="flex items-center gap-4 min-w-[160px]">
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-foreground-dim">5m</span>
          <PriceCell 
            value={token.priceChange5m} 
            type="percentage"
            flash={priceChangeFlash}
          />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-foreground-dim">DH</span>
          <span className={cn(
            'text-xs font-medium',
            token.devHolding > 5 ? 'text-warning' : 'text-foreground-secondary'
          )}>
            {token.devHolding.toFixed(0)}%
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-foreground-dim">TH</span>
          <span className={cn(
            'text-xs font-medium',
            token.topHolders > 30 ? 'text-destructive' : 'text-foreground-secondary'
          )}>
            {token.topHolders.toFixed(0)}%
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-foreground-dim">🎯</span>
          <span className={cn(
            'text-xs font-medium',
            token.snipers > 20 ? 'text-warning' : 'text-foreground-secondary'
          )}>
            {token.snipers}%
          </span>
        </div>
      </div>

      {/* Progress Bar (for Final Stretch) */}
      {showProgress && token.bondingProgress !== undefined && (
        <div className="min-w-[80px]">
          <ProgressBar 
            value={token.bondingProgress} 
            showLabel 
            size="md"
          />
        </div>
      )}

      {/* Market Cap & Volume */}
      <div className="flex flex-col items-end min-w-[80px] ml-auto">
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-foreground-dim">MC:</span>
          <span 
            className={cn(
              'font-mono text-sm font-semibold text-success',
              marketCapFlash === 'up' && 'animate-flash-green',
              marketCapFlash === 'down' && 'animate-flash-red'
            )}
          >
            {formatMarketCap(token.marketCap)}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-foreground-dim">V:</span>
          <span 
            className={cn(
              'font-mono text-xs text-foreground-secondary',
              volumeFlash === 'up' && 'animate-flash-green'
            )}
          >
            {formatVolume(token.volume)}
          </span>
        </div>
        <span className="text-[10px] text-foreground-dim">TX: {token.transactions}</span>
      </div>

      {/* Quick Buy Button */}
      <QuickBuyButton
        amount={token.quickBuyAmount}
        tokenTicker={token.ticker}
        onBuy={handleQuickBuy}
        className="ml-2"
      />
    </motion.div>
  );
});

TokenRow.displayName = 'TokenRow';
