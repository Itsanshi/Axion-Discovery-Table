import React, { memo } from 'react';
import { cn } from '@/lib/utils';
import { Token } from '@/types/token';
import { formatMarketCap, formatVolume, formatSOL } from '@/lib/mockData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TokenAvatar } from './TokenAvatar';
import { SocialLinks } from './SocialLinks';
import { StatBadge } from './StatBadge';
import { ProgressBar } from './ProgressBar';
import { Button } from '@/components/ui/button';
import { Copy, ExternalLink, TrendingUp, TrendingDown, Zap } from 'lucide-react';
import { toast } from 'sonner';

interface TokenDetailModalProps {
  token: Token | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TokenDetailModal = memo<TokenDetailModalProps>(({
  token,
  open,
  onOpenChange
}) => {
  if (!token) return null;

  const copyAddress = () => {
    navigator.clipboard.writeText(token.address);
    toast.success('Address copied to clipboard');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card border-card-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <TokenAvatar 
              src={token.imageUrl} 
              alt={token.name} 
              size="lg"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold">{token.ticker}</span>
              <span className="text-sm text-foreground-secondary font-normal">{token.name}</span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Address */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-background-surface">
            <code className="text-xs text-foreground-muted font-mono">
              {token.address.slice(0, 8)}...{token.address.slice(-8)}
            </code>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={copyAddress} className="h-7 w-7 p-0">
                <Copy className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="sm" asChild className="h-7 w-7 p-0">
                <a 
                  href={`https://solscan.io/token/${token.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-foreground-muted">Links:</span>
            <SocialLinks
              twitter={token.socials.twitter}
              website={token.socials.website}
              telegram={token.socials.telegram}
              discord={token.socials.discord}
            />
          </div>

          {/* Market Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-background-surface">
              <span className="text-xs text-foreground-dim block mb-1">Market Cap</span>
              <span className="text-lg font-bold text-success">{formatMarketCap(token.marketCap)}</span>
            </div>
            <div className="p-3 rounded-lg bg-background-surface">
              <span className="text-xs text-foreground-dim block mb-1">Volume</span>
              <span className="text-lg font-bold text-foreground">{formatVolume(token.volume)}</span>
            </div>
          </div>

          {/* Price Changes */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              {token.priceChange5m >= 0 ? (
                <TrendingUp className="h-4 w-4 text-success" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
              <span className="text-sm text-foreground-muted">5m:</span>
              <span className={cn(
                'font-mono font-medium',
                token.priceChange5m >= 0 ? 'text-success' : 'text-destructive'
              )}>
                {token.priceChange5m >= 0 ? '+' : ''}{token.priceChange5m.toFixed(0)}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              {token.priceChange1h >= 0 ? (
                <TrendingUp className="h-4 w-4 text-success" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
              <span className="text-sm text-foreground-muted">1h:</span>
              <span className={cn(
                'font-mono font-medium',
                token.priceChange1h >= 0 ? 'text-success' : 'text-destructive'
              )}>
                {token.priceChange1h >= 0 ? '+' : ''}{token.priceChange1h.toFixed(0)}%
              </span>
            </div>
          </div>

          {/* Holder Stats */}
          <div className="flex flex-wrap gap-4">
            <StatBadge type="holders" value={token.holders} />
            <StatBadge type="transactions" value={token.transactions} />
            <StatBadge type="devHolding" value={token.devHolding} />
            <StatBadge type="topHolders" value={token.topHolders} />
            <StatBadge type="snipers" value={token.snipers} />
          </div>

          {/* Progress */}
          {token.bondingProgress !== undefined && (
            <div>
              <span className="text-xs text-foreground-dim block mb-2">Bonding Progress</span>
              <ProgressBar value={token.bondingProgress} showLabel size="md" />
            </div>
          )}

          {/* Quick Buy Button */}
          <Button 
            className="w-full h-12 gap-2 bg-primary hover:bg-primary-glow text-primary-foreground font-semibold"
            onClick={() => toast.success(`Buy order placed for ${token.ticker}`)}
          >
            <Zap className="h-5 w-5" />
            Quick Buy {token.quickBuyAmount} SOL
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
});

TokenDetailModal.displayName = 'TokenDetailModal';
